import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VlogCard } from "@/components/vlog-card";

export default function LandingPage() {
  const trustIndicators = [
    { label: "Public Beta", icon: "🚀" },
    { label: "Creator First", icon: "💎" },
    { label: "Free Forever", icon: "✨" },
    { label: "Fast Publishing", icon: "⚡" },
  ];

  return (
    <div className="flex flex-col gap-16 py-8 md:py-24">
      {/* Hero Section */}
      <section className="container px-4 text-center space-y-6">
        <Badge variant="secondary" className="px-4 py-1 mb-4 rounded-full font-medium">
          The Future of Vlogging is Here
        </Badge>
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-balance">
          Share your journey <br className="hidden md:block" /> with the world.
        </h1>
        <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
          The simplest platform for creators to publish, grow, and connect. No algorithms, just pure storytelling.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button size="lg" className="h-12 px-8 rounded-full shadow-lg">Start Creating</Button>
          <Button size="lg" variant="outline" className="h-12 px-8 rounded-full">Explore Vlogs</Button>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <section className="bg-muted/30 border-y border-border/50 py-8">
        <div className="container px-4 flex flex-wrap justify-center md:justify-between gap-8 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
          {trustIndicators.map((item) => (
            <div key={item.label} className="flex items-center gap-2 font-semibold tracking-tight uppercase text-sm">
              <span>{item.icon}</span> {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="container px-4 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Featured Stories</h2>
            <p className="text-muted-foreground">Handpicked content from our growing community.</p>
          </div>
          <Button variant="ghost" className="w-fit">View All Browse →</Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured cards are larger */}
          <div className="h-[400px] bg-muted animate-pulse rounded-2xl" /> 
          <div className="h-[400px] bg-muted animate-pulse rounded-2xl" />
        </div>
      </section>
    </div>
  );
}