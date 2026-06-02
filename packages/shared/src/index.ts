export const TRIAL_DAYS = 7;

export type TenantStatus = "TRIAL" | "ACTIVE" | "SUSPENDED_TRIAL_EXPIRED" | "SUSPENDED" | "MANUAL_REVIEW";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type PaymentMethod = "CASH" | "CARD" | "BANK_TRANSFER" | "MOBILE_WALLET";

export function formatBusinessId(sequence: number): string {
  return `TP-${sequence.toString().padStart(6, "0")}`;
}

export function addTrialDays(start: Date, days = TRIAL_DAYS): Date {
  const expiry = new Date(start);
  expiry.setUTCDate(expiry.getUTCDate() + days);
  return expiry;
}

