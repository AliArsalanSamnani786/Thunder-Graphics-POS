import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TenantService } from "./tenant.service";

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly tenantService: TenantService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    this.tenantService.requireTenant(request.actor);
    return true;
  }
}

