import { Injectable } from "@nestjs/common";

@Injectable()
export class SuperAdminService {
  dashboardSummary() {
    return {
      totalBusinesses: 0,
      activeBusinesses: 0,
      trialBusinesses: 0,
      expiredBusinesses: 0,
      revenueStatistics: [],
      subscriptionStatistics: []
    };
  }
}

