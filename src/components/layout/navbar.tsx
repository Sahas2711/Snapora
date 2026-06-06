"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { logoutAction } from "@/actions/auth.actions";
import { useTheme } from "@/components/theme-provider";

export function Navbar() {
  const { data: session, status } = useSession();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
  console.log("NAVBAR STATUS:", status);
  console.log("NAVBAR SESSION:", session);
    console.log("USER =", session?.user);
}, [status, session]);
  useEffect(() => {
    // Mounted state is the standard next-themes pattern for hydration safety
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const initials = session?.user?.name
    ?.split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const closeAll = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" onClick={closeAll} className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Snap<span className="text-primary">ora</span>
            </span>
          </Link>

          {/* Desktop center nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/vlogs" className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md hover:bg-muted transition-colors">
              Discover
            </Link>
            {session?.user ? (
              <Link href="/create-vlog" className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md hover:bg-muted transition-colors">
                Write
              </Link>
            ) : null}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggle}
              aria-label={mounted ? (resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
              className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {mounted && resolvedTheme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            {status === "loading" ? (
              <div className="w-24 h-8 rounded-lg bg-muted animate-pulse" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((p) => !p)}
                  className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="w-7 h-7 bg-gradient-to-br from-primary to-purple-600 text-primary-foreground rounded-full flex items-center justify-center font-semibold text-xs shrink-0">
                    {initials}
                  </span>
                  <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                    {session.user.name}
                  </span>
                  <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} aria-hidden="true" />
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-card rounded-xl shadow-lg border border-border py-1 z-50">
                      <div className="px-3 py-2 border-b border-border">
                        <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                      </div>
                      <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        Profile
                      </Link>
                      <Link href="/create-vlog" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        New story
                      </Link>
                      <div className="border-t border-border mt-1 pt-1">
                        <form action={logoutAction}>
                          <button type="submit" className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            Sign out
                          </button>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md transition-colors">
                  Sign in
                </Link>
                <Link href="/register" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-lg transition-colors shadow-sm">
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-1">
            <button
              type="button"
              onClick={toggle}
              aria-label={mounted ? (resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
              className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {mounted && resolvedTheme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((p) => !p)}
              className="flex flex-col justify-center items-center w-8 h-8 rounded-md hover:bg-muted transition-colors gap-1.5"
            >
              <span className={`block h-px w-5 bg-foreground/60 rounded transition-all duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-foreground/60 rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-foreground/60 rounded transition-all duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-5 pt-3 space-y-0.5">
          <Link href="/vlogs" onClick={closeAll} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted">
            Discover stories
          </Link>

          {status !== "loading" && session?.user ? (
            <>
              <Link href="/create-vlog" onClick={closeAll} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted">
                Write a story
              </Link>
              <Link href="/profile" onClick={closeAll} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted">
                <span className="w-7 h-7 bg-gradient-to-br from-primary to-purple-600 text-primary-foreground rounded-full flex items-center justify-center font-semibold text-xs shrink-0">
                  {initials}
                </span>
                {session.user.name}
              </Link>
              <div className="pt-1 border-t border-border mt-1">
                <form action={logoutAction}>
                  <button type="submit" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10">
                    Sign out
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <Link href="/login" onClick={closeAll} className="block text-center text-sm font-medium text-foreground border border-border px-4 py-2.5 rounded-lg hover:bg-muted">
                Sign in
              </Link>
              <Link href="/register" onClick={closeAll} className="block text-center text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-2.5 rounded-lg transition-colors shadow-sm">
                Get started free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
