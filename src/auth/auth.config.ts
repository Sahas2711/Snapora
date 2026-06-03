import type { UserRole, UserStatus } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";

import { SESSION_MAX_AGE_SECONDS } from "@/constants/auth.constants";
import { getAuthEnv } from "@/lib/auth/env";

const authEnv = getAuthEnv();

/** Edge-safe config — no Prisma or Node crypto (used by middleware). */
export const authConfig = {
  secret: authEnv.secret,
  trustHost: authEnv.trustHost,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE_SECONDS,
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role;
        token.status = user.status;
      }

      return token;
    },
    async session({ session, token }) {
      const jwt = token as JWT;

      if (session.user) {
        session.user.id = jwt.id;
        session.user.role = jwt.role as UserRole;
        session.user.status = jwt.status as UserStatus;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
