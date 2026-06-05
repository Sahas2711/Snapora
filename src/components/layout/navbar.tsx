"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { logoutAction } from "@/actions/auth.actions";
import { useTheme } from "next-themes";

export function Navbar() {
  const { data: session, status } = useSession();
  const { theme, setTheme, resolvedTheme } = useTheme();
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
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-[rgba(15,17,23,0.9)] backdrop-blur-xl border-b border-gray-100 dark:border-[#2d3348]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" onClick={closeAll} className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-[#f1f5f9]">
              Snap<span className="text-blue-600">ora</span>
            </span>
          </Link>

          {/* Desktop center nav */}
          <div className="hidden md:flex items-center gap-0.5">
            <Link href="/vlogs" className="text-sm font-medium text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-[#f1f5f9] px-3 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-[#1e2433] transition-colors">
              Discover
            </Link>
            {session?.user ? (
              <Link href="/create-vlog" className="text-sm font-medium text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-[#f1f5f9] px-3 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-[#1e2433] transition-colors">
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
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-[#f1f5f9] hover:bg-gray-100 dark:hover:bg-[#1e2433] transition-colors"
            >
              {theme === "dark" ? (
                /* Sun */
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                /* Moon */
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            {status === "loading" ? (
              <div className="w-24 h-8 rounded-lg bg-gray-100 dark:bg-[#1e2433] animate-pulse" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((p) => !p)}
                  className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-[#1e2433] transition-colors border border-transparent hover:border-gray-200 dark:hover:border-[#2d3348]"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center font-semibold text-xs shrink-0">
                    {initials}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-[#cbd5e1] max-w-[100px] truncate">
                    {session.user.name}
                  </span>
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <>
                    {/* backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} aria-hidden="true" />
                    {/* dropdown */}
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg border border-gray-100 dark:border-[#2d3348] py-1 z-50">
                      <div className="px-3 py-2 border-b border-gray-50 dark:border-[#252b3b]">
                        <p className="text-xs text-gray-400 dark:text-[#64748b] truncate">{session.user.email}</p>
                      </div>
                      <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#1e2433] transition-colors">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        Profile
                      </Link>
                      <Link href="/create-vlog" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#1e2433] transition-colors">
                        <svg className="w-4 h-4 text-gray-400 dark:text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        New story
                      </Link>
                      <div className="border-t border-gray-50 dark:border-[#252b3b] mt-1 pt-1">
                        <form action={logoutAction}>
                          <button type="submit" className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
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
                <Link href="/login" className="text-sm font-medium text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-[#f1f5f9] px-3 py-1.5 rounded-md transition-colors">
                  Sign in
                </Link>
                <Link href="/register" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg transition-colors">
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-1">
            {/* Theme toggle mobile */}
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#1e2433] transition-colors"
            >
              {theme === "dark" ? (
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
              className="flex flex-col justify-center items-center w-8 h-8 rounded-md hover:bg-gray-100 dark:hover:bg-[#1e2433] transition-colors gap-1.5"
            >
              <span className={`block h-px w-5 bg-gray-700 dark:bg-[#cbd5e1] rounded transition-all duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-gray-700 dark:bg-[#cbd5e1] rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-gray-700 dark:bg-[#cbd5e1] rounded transition-all duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-[#2d3348] bg-white dark:bg-[#0f1117] px-4 pb-5 pt-3 space-y-0.5">
          <Link href="/vlogs" onClick={closeAll} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#1e2433]">
            Discover stories
          </Link>

          {status !== "loading" && session?.user ? (
            <>
              <Link href="/create-vlog" onClick={closeAll} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#1e2433]">
                Write a story
              </Link>
              <Link href="/profile" onClick={closeAll} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-[#cbd5e1] hover:bg-gray-50 dark:hover:bg-[#1e2433]">
                <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center font-semibold text-xs shrink-0">
                  {initials}
                </span>
                {session.user.name}
              </Link>
              <div className="pt-1 border-t border-gray-100 dark:border-[#2d3348] mt-1">
                <form action={logoutAction}>
                  <button type="submit" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                    Sign out
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <Link href="/login" onClick={closeAll} className="block text-center text-sm font-medium text-gray-700 dark:text-[#cbd5e1] border border-gray-200 dark:border-[#2d3348] px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1e2433]">
                Sign in
              </Link>
              <Link href="/register" onClick={closeAll} className="block text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors">
                Get started free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
