import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-[#2d3348] bg-white dark:bg-[#0f1117] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-[#64748b]">
        <Link href="/" className="font-semibold text-blue-600 hover:text-blue-700">
          Snapora
        </Link>
        <p>© {new Date().getFullYear()} Snapora. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link href="/vlogs" className="hover:text-gray-600 dark:hover:text-[#94a3b8] transition-colors">
            Browse
          </Link>
          <Link href="/register" className="hover:text-gray-600 dark:hover:text-[#94a3b8] transition-colors">
            Sign up
          </Link>
          <Link href="/login" className="hover:text-gray-600 dark:hover:text-[#94a3b8] transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
