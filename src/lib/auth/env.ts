export function getAuthEnv() {
  return {
    secret:
      process.env.AUTH_SECRET ?? "development-only-secret-replace-in-env",
    url: process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL,
    trustHost: process.env.AUTH_TRUST_HOST === "true",
  };
}
