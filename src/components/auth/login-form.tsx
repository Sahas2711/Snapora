"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";

import { loginAction, type ActionState } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.success) {
      // Full page reload ensures SessionProvider re-initializes
      // and immediately fetches the new session from the cookie.
      // router.push() would keep the old cached session state alive.
      window.location.href = "/";
    }
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </div>

      {state.error ? (
        <p className="text-red-600 text-sm">{state.error}</p>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-sm text-muted-foreground text-center mt-4">
        <Link href="/forgot-password" className="text-primary font-medium hover:underline">
          Forgot password?
        </Link>
      </p>

      <div className="h-2" />
    </form>
  );
}
