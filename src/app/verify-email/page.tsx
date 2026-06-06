"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { verifyEmailAction, type ActionState } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";
  const [state, setState] = useState<ActionState>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email || !token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ error: "Invalid verification link" });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    verifyEmailAction(email, token).then((result) => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(result);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    });
  }, [email, token]);

  if (loading) {
    return <p className="text-sm text-gray-500">Verifying your email...</p>;
  }

  return (
    <div className="space-y-4 text-center">
      {state.error ? (
        <p className="text-red-600 text-sm">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-emerald-600 text-sm">{state.success}</p>
      ) : null}
      <Link href="/login">
        <Button className="w-full">Go to login</Button>
      </Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Email verification
        </h1>
        <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>}>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  );
}
