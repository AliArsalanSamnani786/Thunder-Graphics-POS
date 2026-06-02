import type { RiskLevel, TenantStatus } from "@thunder-pos/shared";

export interface TenantContext {
  tenantId: string;
  businessId: string;
  status: TenantStatus;
}

export interface AuthenticatedActor {
  userId: string;
  email: string;
  tenant?: TenantContext;
  permissions: string[];
  isSuperAdmin: boolean;
}

export interface RiskSignal {
  level: RiskLevel;
  reasons: string[];
}

