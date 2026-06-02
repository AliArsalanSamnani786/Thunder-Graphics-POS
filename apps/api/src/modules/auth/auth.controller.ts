import { Body, Controller, Post, Req } from "@nestjs/common";
import type { Request } from "express";
import { AuthService } from "./auth.service";
import { RegisterBusinessDto } from "./dto/register-business.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register-business")
  registerBusiness(@Body() dto: RegisterBusinessDto, @Req() request: Request) {
    return this.authService.registerBusiness(dto, {
      ipAddress: request.ip,
      userAgent: request.headers["user-agent"]
    });
  }
}

