import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { DatabaseModule } from "./common/database/database.module";
import { AccountingModule } from "./modules/accounting/accounting.module";
import { AiModule } from "./modules/ai/ai.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CustomersModule } from "./modules/customers/customers.module";
import { EmployeesModule } from "./modules/employees/employees.module";
import { HealthModule } from "./modules/health/health.module";
import { InventoryModule } from "./modules/inventory/inventory.module";
import { OfflineSyncModule } from "./modules/offline-sync/offline-sync.module";
import { PosModule } from "./modules/pos/pos.module";
import { PurchasesModule } from "./modules/purchases/purchases.module";
import { ReportsModule } from "./modules/reports/reports.module";
import { SecurityModule } from "./modules/security/security.module";
import { SuperAdminModule } from "./modules/super-admin/super-admin.module";
import { SuppliersModule } from "./modules/suppliers/suppliers.module";
import { TenantModule } from "./modules/tenant/tenant.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
    DatabaseModule,
    HealthModule,
    TenantModule,
    SecurityModule,
    AuthModule,
    PosModule,
    InventoryModule,
    AccountingModule,
    ReportsModule,
    AiModule,
    SuperAdminModule,
    CustomersModule,
    EmployeesModule,
    OfflineSyncModule,
    PurchasesModule,
    SuppliersModule,
  ]
})
export class AppModule {}
