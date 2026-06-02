import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { AccountingModule } from "./modules/accounting/accounting.module";
import { AiModule } from "./modules/ai/ai.module";
import { AuthModule } from "./modules/auth/auth.module";
import { HealthModule } from "./modules/health/health.module";
import { InventoryModule } from "./modules/inventory/inventory.module";
import { PosModule } from "./modules/pos/pos.module";
import { ReportsModule } from "./modules/reports/reports.module";
import { SecurityModule } from "./modules/security/security.module";
import { SuperAdminModule } from "./modules/super-admin/super-admin.module";
import { TenantModule } from "./modules/tenant/tenant.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    HealthModule,
    TenantModule,
    SecurityModule,
    AuthModule,
    PosModule,
    InventoryModule,
    AccountingModule,
    ReportsModule,
    AiModule,
    SuperAdminModule
  ]
})
export class AppModule {}
