import { Injectable } from "@nestjs/common";

@Injectable()
export class ReportsService {
  listReportTypes() {
    return ["sales", "profit", "inventory", "customer", "supplier", "tax", "employee"] as const;
  }
}

