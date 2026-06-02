import { ForbiddenException, Injectable } from "@nestjs/common";
import type { AuthenticatedActor, TenantContext } from "../../common/types/request-context";

@Injectable()
export class TenantService {
  requireTenant(actor?: AuthenticatedActor): TenantContext {
    if (!actor?.tenant) {
      throw new ForbiddenException("Tenant context is required.");
    }

    if (actor.tenant.status === "SUSPENDED_TRIAL_EXPIRED" || actor.tenant.status === "SUSPENDED") {
      throw new ForbiddenException("Workspace is suspended.");
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

