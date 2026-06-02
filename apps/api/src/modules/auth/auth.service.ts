import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../../common/database/prisma.service";
import { Prisma } from "@prisma/client";
import { SecurityService } from "../security/security.service";
import * as argon2 from "argon2";
import { addTrialDays, formatBusinessId } from "@thunder-pos/shared";
import type { RegisterBusinessDto } from "./dto/register-business.dto";

interface RequestMetadata {
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly securityService: SecurityService
  ) {}

  async registerBusiness(dto: RegisterBusinessDto, metadata: RequestMetadata) {
    if (!dto.acceptedTerms || !dto.acceptedPrivacy) {
      throw new BadRequestException("Terms and privacy policy acceptance are required.");
    }

    const risk = this.securityService.evaluateRegistrationRisk({
      ipAddress: metadata.ipAddress,
      deviceFingerprint: dto.deviceFingerprint,
      phone: dto.mobileNumber,
      whatsapp: dto.whatsappNumber
    });

    if (risk.level === "HIGH") {
      throw new BadRequestException("Registration blocked due to security risk assessment.");
    }

    try {
      const tenant = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const businessId = formatBusinessId(1);
        const passwordHash = await argon2.hash(dto.password);

        const newTenant = await tx.tenant.create({
          data: {
            businessId,
            name: dto.businessName,
            country: dto.country,
            status: "TRIAL",
            trialStartAt: new Date(),
            trialEndAt: addTrialDays(new Date()),
            users: {
              create: {
                name: dto.ownerName,
                email: dto.email,
                phone: dto.mobileNumber,
                passwordHash,
                status: "PENDING_VERIFICATION"
              }
            }
          }
        });

        return newTenant;
      });

      return {
        tenantId: tenant.id,
        businessId: tenant.businessId,
        message: "Business registered successfully. Please verify your email and phone."
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw new InternalServerErrorException("An error occurred during registration.");
    }
  }
}

