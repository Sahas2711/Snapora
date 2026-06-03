import { AuthError } from "next-auth";
import { NextResponse } from "next/server";

import { AppError } from "@/lib/errors/app.error";
import { AuthenticationError } from "@/lib/errors/auth.error";
import { ValidationError } from "@/lib/errors/validation.error";
import { logApiError } from "@/lib/logger/api.logger";
import { errorResponse } from "@/lib/utils/api-response";
import { AuthServiceError } from "@/services/auth.service";

export function handleApiError(
  error: unknown,
  context: { method: string; path: string },
) {
  logApiError(context.method, context.path, error);

  if (error instanceof ValidationError) {
    return errorResponse(error.message, error.status, error.fieldErrors);
  }

  if (error instanceof AuthServiceError) {
    return errorResponse(error.message, error.status);
  }

  if (error instanceof AuthenticationError) {
    return errorResponse(error.message, error.status);
  }

  if (error instanceof AppError) {
    return errorResponse(error.message, error.status);
  }

  if (error instanceof AuthError) {
    return errorResponse("Invalid email or password", 401);
  }

  return errorResponse("Internal server error", 500);
}

export function withApiHandler(
  method: string,
  path: string,
  handler: () => Promise<NextResponse>,
) {
  return handler().catch((error) => handleApiError(error, { method, path }));
}
