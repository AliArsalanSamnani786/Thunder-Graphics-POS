import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "thunder-pos-api",
    checkedAt: new Date().toISOString()
  });
}
