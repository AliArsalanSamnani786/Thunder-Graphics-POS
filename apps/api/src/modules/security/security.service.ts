import { Injectable } from "@nestjs/common";
import type { RiskSignal } from "../../common/types/request-context";

export interface RegistrationRiskInput {
  ipAddress?: string;
  deviceFingerprint?: string;
  phone: string;
  whatsapp: string;
  latitude?: number;
  longitude?: number;
}

@Injectable()
export class SecurityService {
  evaluateRegistrationRisk(input: RegistrationRiskInput): RiskSignal {
    const reasons: string[] = [];

    if (!input.deviceFingerprint) reasons.push("Missing device fingerprint.");
    if (!input.ipAddress) reasons.push("Missing IP address.");
    if (input.phone === input.whatsapp) reasons.push("Phone and WhatsApp are identical; monitor duplicate-trial history.");
    if (input.latitude === undefined || input.longitude === undefined) reasons.push("Location verification was not provided.");

    if (reasons.length >= 4) return { level: "HIGH", reasons };
    if (reasons.length >= 2) return { level: "MEDIUM", reasons };
    return { level: "LOW", reasons };
  }
}

