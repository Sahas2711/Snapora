import type { NextRequest } from "next/server";

export function getClientIp(request: NextRequest | Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") ?? undefined;
}

export function getUserAgent(request: NextRequest | Request): string | undefined {
  return request.headers.get("user-agent") ?? undefined;
}

export function getRequestContext(request: NextRequest | Request) {
  return {
    ipAddress: getClientIp(request),
    userAgent: getUserAgent(request),
  };
}
