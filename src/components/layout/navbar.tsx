"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { logoutAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { data: session, status } = useSession();
  const initials = session?.user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Snapora
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/vlogs"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Browse vlogs
          </Link>
          {status === "loading" ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : session?.user ? (
            <>
              <Link
                href="/create-vlog"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Create vlog
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
              >
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-xs">
                  {initials}
                </span>
                {session.user.name}
              </Link>
              <form action={logoutAction}>
                <Button type="submit" variant="secondary">
                  Logout
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link href="/register">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
