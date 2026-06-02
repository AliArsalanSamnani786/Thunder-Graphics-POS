import { describe, expect, it } from "vitest";
import { AccountingService } from "../src/modules/accounting/accounting.service";
import { InventoryService } from "../src/modules/inventory/inventory.service";
import { PosService } from "../src/modules/pos/pos.service";

describe("core domain foundations", () => {
  it("calculates POS totals with tax and discounts", () => {
    const result = new PosService().completeSale({
      tenantId: "tenant_1",
      items: [{ variantId: "sku_1", quantity: 2, unitPrice: 100, taxRate: 0.1, discountAmount: 10 }],
      payments: [{ method: "CASH", amount: 210 }]
    });

    expect(result.total).toBe(210);
    expect(result.balanceDue).toBe(0);
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

