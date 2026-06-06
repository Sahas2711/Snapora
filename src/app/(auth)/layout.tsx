import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Left side — brand & marketing */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 items-center justify-center p-12">
        <div className="max-w-md mx-auto text-center">
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Snap<span className="text-primary">ora</span>
              </span>
            </Link>

            <h2 className="text-2xl font-bold text-foreground mb-3">
              Join the creator community
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-10">
              Share your stories, connect with creators, and build your audience.
              No algorithms. No distractions. Just pure storytelling.
            </p>

            {/* Feature list */}
            <div className="space-y-4 text-left max-w-xs mx-auto">
              {[
                { icon: "✍️", text: "Write beautiful stories" },
                { icon: "📸", text: "Upload cover images" },
                { icon: "📊", text: "Track your analytics" },
                { icon: "❤️", text: "Build your audience" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-sm text-foreground font-medium">{f.text}</span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="mt-10 p-4 rounded-xl bg-card border border-border shadow-sm">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &ldquo;The simplest platform for creators. I published my first story in under 5 minutes.&rdquo;
              </p>
              <p className="text-xs font-semibold text-foreground mt-2">— Sarah K., Product Designer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — auth form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile brand (visible only on small screens) */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-foreground">
                Snap<span className="text-primary">ora</span>
              </span>
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">Share your story with the world</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
