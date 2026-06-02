import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/database/prisma.service";
import type { PaymentMethod } from "@thunder-pos/shared";

export interface CompleteSaleInput {
  tenantId: string;
  branchId: string;
  items: Array<{ variantId: string; quantity: number; unitPrice: number; taxRate: number; discountAmount?: number }>;
  payments: Array<{ method: PaymentMethod; amount: number; reference?: string }>;
}

@Injectable()
export class PosService {
  constructor(private readonly prisma: PrismaService) {}

  async completeSale(input: CompleteSaleInput) {
    return await this.prisma.$transaction(async (tx) => {
      const subtotal = input.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      const discount = input.items.reduce((sum, item) => sum + (item.discountAmount ?? 0), 0);
      const tax = input.items.reduce((sum, item) => sum + item.unitPrice * item.quantity * item.taxRate, 0);
      const total = subtotal - discount + tax;

      // 1. Create Sale
      const sale = await tx.sale.create({
        data: {
          tenantId: input.tenantId,
          branchId: input.branchId,
          receiptNo: `REC-${Date.now()}`,
          status: "COMPLETED",
          subtotal,
          discount,
          tax,
          total,
          items: {
            create: input.items.map((item) => ({
              tenantId: input.tenantId,
              variantId: item.variantId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              tax: item.unitPrice * item.quantity * item.taxRate,
              discount: item.discountAmount ?? 0,
            })),
          },
          payments: {
            create: input.payments.map((p) => ({
              tenantId: input.tenantId,
              method: p.method,
              amount: p.amount,
            })),
          },
        },
      });

      // 2. Update Stock Movements
      for (const item of input.items) {
        const stockItem = await tx.stockItem.findFirst({
          where: { tenantId: input.tenantId, variantId: item.variantId },
        });

        if (!stockItem || Number(stockItem.quantity) < item.quantity) {
          throw new BadRequestException(`Insufficient stock for variant ${item.variantId}`);
        }

        await tx.stockMovement.create({
          data: {
            tenantId: input.tenantId,
            stockItemId: stockItem.id,
            type: "SALE",
            quantity: -item.quantity,
            reference: sale.id,
          },
        });

        await tx.stockItem.update({
          where: { id: stockItem.id },
          data: { quantity: { decrement: item.quantity } },
        });
      }

      // 3. Post Accounting Journal
      const journal = await tx.journalEntry.create({
        data: {
          tenantId: input.tenantId,
          description: `Sale ${sale.receiptNo}`,
          lines: {
            create: [
              { tenantId: input.tenantId, accountId: "REVENUE_ACC_ID", credit: total },
              { tenantId: input.tenantId, accountId: "CASH_ACC_ID", debit: total },
            ],
          },
        },
      });

      return sale;
    });
  }
}

