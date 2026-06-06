import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <Link href="/" className="font-semibold text-primary hover:text-primary/80 transition-colors">
          Snapora
        </Link>
        <p>© {new Date().getFullYear()} Snapora. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link href="/vlogs" className="hover:text-foreground transition-colors">Browse</Link>
          <Link href="/register" className="hover:text-foreground transition-colors">Sign up</Link>
          <Link href="/login" className="hover:text-foreground transition-colors">Sign in</Link>
        </div>
      </div>
    </footer>
  );
}
