import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class InventoryService {
  assertStockAvailable(availableQuantity: number, requestedQuantity: number, allowNegativeStock = false): void {
    if (!allowNegativeStock && requestedQuantity > availableQuantity) {
      throw new BadRequestException("Insufficient stock.");
    }
  }
}

