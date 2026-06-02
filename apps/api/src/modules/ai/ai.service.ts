import { Injectable } from "@nestjs/common";

@Injectable()
export class AiService {
  generateInsight(tenantId: string, signal: string) {
    return {
      tenantId,
      signal,
      advisoryOnly: true,
      recommendation: "Review sales velocity, stock levels, and recent returns before taking action."
    };
  }
}

