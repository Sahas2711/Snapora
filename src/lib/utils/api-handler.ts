import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_RATE_LIMIT } from "@/constants/auth.constants";
import { handleApiError } from "@/lib/utils/handle-api-error";
import {
  checkRateLimit,
  getRateLimitKey,
} from "@/lib/utils/rate-limit";
import { getClientIp } from "@/lib/utils/request";

export async function enforceAuthRateLimit(
  request: NextRequest,
  route: string,
) {
  const ip = getClientIp(request);
  const result = checkRateLimit(getRateLimitKey(ip, route), AUTH_RATE_LIMIT);

  if (!result.success) {
    return NextResponse.json(
      { status: "error", message: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.ceil((result.resetAt - Date.now()) / 1000),
          ),
        },
      },
    );
  }

  return null;
}

export async function parseJsonBody(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    throw new Error("Invalid JSON body");
  }
}

export { handleApiError };
