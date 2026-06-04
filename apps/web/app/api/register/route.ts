import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import { addTrialDays, formatBusinessId } from '@thunder-pos/shared';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const dto = await request.json();

    // Simplified business registration logic
    const tenant = await prisma.$transaction(async (tx) => {
      const count = await tx.tenant.count();
      const businessId = formatBusinessId(count + 1);
      const passwordHash = await argon2.hash(dto.password);

      return await tx.tenant.create({
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
    });

    return NextResponse.json({
      tenantId: tenant.id,
      businessId: tenant.businessId,
      message: "Business registered successfully."
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "An error occurred during registration." }, { status: 500 });
  }
}
