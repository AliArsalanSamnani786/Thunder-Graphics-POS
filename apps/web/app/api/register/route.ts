import { NextResponse } from "next/server";

function getApiBaseUrl(request: Request) {
  return (
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    new URL(request.url).origin
  ).replace(/\/$/, "");
}

function getGatewayMessage(status: number, payload: unknown) {
  if (status === 404) {
    return "Registration API was not found. Check API_URL and confirm /api/v1/health works.";
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const message = record.message ?? record.error;

    if (Array.isArray(message)) {
      return message.join(" ");
    }

    if (typeof message === "string" && message.trim() && !message.includes("<!DOCTYPE html>")) {
      return message;
    }
  }

  return `Registration API returned HTTP ${status}. Check the API deployment logs.`;
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
    const targetUrl = `${apiBaseUrl}/api/v1/auth/register-business`;
    
    console.log(`[Proxy] Request URL: ${request.url}`);
    console.log(`[Proxy] API Base URL: ${apiBaseUrl}`);
    console.log(`[Proxy] Target URL: ${targetUrl}`);

    const upstream = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      cache: "no-store"
    });

    const contentType = upstream.headers.get("content-type") ?? "";
    const payload: unknown = contentType.includes("application/json")
      ? await upstream.json()
      : { message: await upstream.text() };

    if (!upstream.ok) {
      return NextResponse.json(
        { message: getGatewayMessage(upstream.status, payload), upstreamStatus: upstream.status },
        { status: upstream.status }
      );
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Registration proxy error:", error);
    return NextResponse.json(
      { message: "Registration service is unavailable. Please try again shortly." },
      { status: 502 }
    );
  }
}
