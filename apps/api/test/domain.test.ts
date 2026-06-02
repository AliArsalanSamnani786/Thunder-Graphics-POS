import { describe, expect, it, vi } from "vitest";
import { AccountingService } from "../src/modules/accounting/accounting.service";
import { InventoryService } from "../src/modules/inventory/inventory.service";
import { PosService } from "../src/modules/pos/pos.service";
import { PrismaService } from "../src/common/database/prisma.service";

describe("core domain foundations", () => {
  it("processes a sale with correct input", async () => {
    const mockPrisma = {
      $transaction: vi.fn(async (cb) => {
        return cb({
          sale: { create: vi.fn().mockResolvedValue({ id: "sale_1", receiptNo: "REC-123" }) },
          stockItem: { findFirst: vi.fn().mockResolvedValue({ id: "si_1", quantity: 10 }), update: vi.fn() },
          stockMovement: { create: vi.fn() },
          journalEntry: { create: vi.fn() }
        });
      })
    } as unknown as PrismaService;

    const result = await new PosService(mockPrisma).completeSale({
      tenantId: "tenant_1",
      branchId: "branch_1",
      items: [{ variantId: "sku_1", quantity: 2, unitPrice: 100, taxRate: 0.1, discountAmount: 10 }],
      payments: [{ method: "CASH", amount: 210 }]
    });

    expect(result.id).toBe("sale_1");
  });

  it("rejects negative stock unless enabled", () => {
    const service = new InventoryService();
    expect(() => service.assertStockAvailable(1, 2)).toThrow("Insufficient stock.");
  });

  it("requires balanced journals", () => {
    const service = new AccountingService();
    expect(() =>
      service.assertBalanced([
        { accountId: "cash", debit: 100, credit: 0 },
        { accountId: "revenue", debit: 0, credit: 100 }
      ])
    ).not.toThrow();
  });
});

