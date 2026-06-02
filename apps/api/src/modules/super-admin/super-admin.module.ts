import { Module } from "@nestjs/common";
import { SuperAdminService } from "./super-admin.service";

@Module({
  providers: [SuperAdminService],
  exports: [SuperAdminService]
})
export class SuperAdminModule {}

