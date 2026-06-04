import { NextResponse } from "next/server";

function getApiBaseUrl(request: Request) {
  return (
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    new URL(request.url).origin
  ).replace(/\/$/, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    });

    const forwardedFor = request.headers.get("x-forwarded-for");
    const userAgent = request.headers.get("user-agent");

    if (forwardedFor) {
      headers.set("x-forwarded-for", forwardedFor);
    }

    if (userAgent) {
      headers.set("user-agent", userAgent);
    }

    const apiBaseUrl = getApiBaseUrl(request);
    const upstream = await fetch(`${apiBaseUrl}/api/v1/auth/register-business`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      cache: "no-store"
    });

    const contentType = upstream.headers.get("content-type") ?? "";
    const payload = contentType.includes("application/json")
      ? await upstream.json()
      : { message: await upstream.text() };

    return NextResponse.json(payload, { status: upstream.status });
  } catch (error) {
    console.error("Registration proxy error:", error);
    return NextResponse.json(
      { message: "Registration service is unavailable. Please try again shortly." },
      { status: 502 }
    );
  }
}
