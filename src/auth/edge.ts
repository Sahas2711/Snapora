import NextAuth from "next-auth";

import { authConfig } from "@/auth/auth.config";

export const { auth: edgeAuth } = NextAuth(authConfig);
