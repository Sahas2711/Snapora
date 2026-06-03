"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, Suspense } from "react";

import { resetPasswordAction, type ActionState } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {};

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="token" value={token} />

      <div>
        <Label htmlFor="password">New password</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      {state.error ? <p className="text-red-600 text-sm">{state.error}</p> : null}
      {state.success ? (
        <p className="text-emerald-600 text-sm">{state.success}</p>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending || !email || !token}>
        {pending ? "Resetting..." : "Reset password"}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Reset password</h1>
        <p className="text-sm text-gray-500 mt-1">Choose a new password</p>
      </div>

      <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>}>
        <ResetPasswordForm />
      </Suspense>

      <p className="text-sm text-center text-gray-600">
        <Link href="/login" className="text-blue-600 hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
