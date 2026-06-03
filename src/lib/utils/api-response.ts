import { NextResponse } from "next/server";

type SuccessPayload<T> = {
  status: "success";
  data: T;
  message?: string;
};

type ErrorPayload = {
  status: "error";
  message: string;
  errors?: Record<string, string[]>;
};

export function successResponse<T>(
  data: T,
  status = 200,
  message?: string,
) {
  const body: SuccessPayload<T> = { status: "success", data };
  if (message) body.message = message;
  return NextResponse.json(body, { status });
}

export function errorResponse(
  message: string,
  status = 400,
  errors?: Record<string, string[]>,
) {
  const body: ErrorPayload = { status: "error", message };
  if (errors) body.errors = errors;
  return NextResponse.json(body, { status });
}
