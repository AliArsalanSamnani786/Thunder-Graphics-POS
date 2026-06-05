import { Prisma, PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TRIAL_DAYS = 7;

const prismaClient = globalThis as typeof globalThis & {
  thunderPosPrisma?: PrismaClient;
};

const prisma = prismaClient.thunderPosPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  prismaClient.thunderPosPrisma = prisma;
}

interface RegistrationPayload {
  businessName?: unknown;
  ownerName?: unknown;
  email?: unknown;
  mobileNumber?: unknown;
  whatsappNumber?: unknown;
  country?: unknown;
  password?: unknown;
  acceptedTerms?: unknown;
  acceptedPrivacy?: unknown;
}

function addTrialDays(start: Date, days = TRIAL_DAYS) {
  const expiry = new Date(start);
  expiry.setUTCDate(expiry.getUTCDate() + days);
  return expiry;
}

function formatBusinessId(sequence: number) {
  return `TP-${sequence.toString().padStart(6, "0")}`;
}

function readString(payload: RegistrationPayload, key: keyof RegistrationPayload) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function validateRegistration(payload: RegistrationPayload) {
  const businessName = readString(payload, "businessName");
  const ownerName = readString(payload, "ownerName");
  const email = readString(payload, "email").toLowerCase();
  const mobileNumber = readString(payload, "mobileNumber");
  const whatsappNumber = readString(payload, "whatsappNumber");
  const country = readString(payload, "country");
  const password = readString(payload, "password");

  if (!businessName || !ownerName || !email || !mobileNumber || !whatsappNumber || !country || !password) {
    return { error: "All registration fields are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (password.length < 10 || password.length > 128) {
    return { error: "Password must be between 10 and 128 characters." };
  }

  if (payload.acceptedTerms !== true || payload.acceptedPrivacy !== true) {
    return { error: "You must accept the terms and privacy policy to register." };
  }

  return {
    data: {
      businessName,
      ownerName,
      email,
      mobileNumber,
      whatsappNumber,
      country,
      password
    }
  };
}

export async function POST(request: Request) {
  let payload: RegistrationPayload;

  try {
    payload = (await request.json()) as RegistrationPayload;
  } catch {
    return NextResponse.json({ message: "Invalid registration request body." }, { status: 400 });
  }

  const validated = validateRegistration(payload);

  if ("error" in validated) {
    return NextResponse.json({ message: validated.error }, { status: 400 });
  }

  try {
    const tenant = await prisma.$transaction(async (tx) => {
      const count = await tx.tenant.count();
      const businessId = formatBusinessId(count + 1);
      const passwordHash = await argon2.hash(validated.data.password);
      const now = new Date();

      return tx.tenant.create({
        data: {
          businessId,
          name: validated.data.businessName,
          country: validated.data.country,
          status: "TRIAL",
          trialStartAt: now,
          trialEndAt: addTrialDays(now),
          users: {
            create: {
              name: validated.data.ownerName,
              email: validated.data.email,
              phone: validated.data.mobileNumber,
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
      message: "Business registered successfully. Please verify your email and phone."
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const target = Array.isArray(error.meta?.target) ? error.meta.target.join(", ") : "";

      return NextResponse.json(
        {
          message: target.includes("email")
            ? "A user with this email already exists."
            : "A business registration with these details already exists."
        },
        { status: 409 }
      );
    }

    console.error("Registration route error:", error);
    return NextResponse.json({ message: "An error occurred during registration." }, { status: 500 });
  }
}
