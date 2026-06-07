import { ThemeProvider } from "@/components/theme-provider";
import { AppSessionProvider } from "@/providers/session-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeInjector } from "@/components/theme-injector";
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
        {/* Flash prevention — injected via useServerInsertedHTML outside React tree */}
        <ThemeInjector />
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