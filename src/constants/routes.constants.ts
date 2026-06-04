export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
] as const;

export const AUTH_ROUTES = ["/login", "/register"] as const;

export const PROTECTED_ROUTES = ["/profile", "/create-vlog", "/vlogs/new"] as const;

export const ADMIN_ROUTES = ["/admin"] as const;
