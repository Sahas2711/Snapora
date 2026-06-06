import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSessionProvider } from "@/providers/session-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen transition-colors duration-300`}>
        {/* Flash prevention via next/script — uses ReactDOM.preinit() so React 19 doesn't warn */}
        <Script
          id="snapora-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){var e=localStorage.getItem("theme")||"system";var t=e==="system"?(window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"):e;document.documentElement.classList.add(t)}()`,
          }}
        />
        <ThemeProvider defaultTheme="system">
          <AppSessionProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AppSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}