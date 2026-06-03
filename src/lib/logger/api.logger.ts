import { baseLogger } from "@/lib/logger/index";

export const apiLogger = baseLogger.child({ module: "api" });

export function logApiRequest(
  method: string,
  path: string,
  status: number,
  durationMs: number,
) {
  apiLogger.info({ method, path, status, durationMs }, "API request completed");
}

export function logApiError(method: string, path: string, error: unknown) {
  apiLogger.error({ method, path, err: error }, "API request failed");
}

export function logDatabaseError(operation: string, error: unknown) {
  apiLogger.error({ operation, err: error }, "Database error");
}

export function logServerError(context: string, error: unknown) {
  apiLogger.error({ context, err: error }, "Server error");
}
