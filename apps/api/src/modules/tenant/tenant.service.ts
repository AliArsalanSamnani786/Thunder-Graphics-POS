import { ForbiddenException, Injectable } from "@nestjs/common";
import type { AuthenticatedActor, TenantContext } from "../../common/types/request-context";

@Injectable()
export class TenantService {
  requireTenant(actor?: AuthenticatedActor): TenantContext {
    if (!actor?.tenant) {
      throw new ForbiddenException("Tenant context is required.");
    }

    const { status, trialEndAt } = actor.tenant;

    // 1. Check if the business is manually suspended by the Super Admin
    if (status === "SUSPENDED") {
      throw new ForbiddenException("This workspace has been suspended. Please contact support to reactivate.");
    }

    // 2. Check for trial expiration
    if (status === "TRIAL" || status === "SUSPENDED_TRIAL_EXPIRED") {
      const now = new Date();
      const expiry = trialEndAt ? new Date(trialEndAt) : null;

      if (!expiry || now > expiry) {
        throw new ForbiddenException("Your free trial has expired. Please upgrade to a paid plan to continue selling.");
      }
    }

    // 3. Block manual review status
    if (status === "MANUAL_REVIEW") {
      throw new ForbiddenException("Your account is under manual review for security reasons.");
    }

    return actor.tenant;
  }

  assertSameTenant(recordTenantId: string, actor?: AuthenticatedActor): void {
    const tenant = this.requireTenant(actor);
    if (recordTenantId !== tenant.tenantId) {
      throw new ForbiddenException("Cross-tenant access denied.");
    }
  }
}

