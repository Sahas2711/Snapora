import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { GradientText } from "@/components/ui/gradient-text";
import { StatsCard } from "@/components/ui/stats-card";
import { CreatorCard } from "@/components/ui/creator-card";
import { VlogCard } from "@/components/vlogs/vlog-card";
import { Badge } from "@/components/ui/badge";
import { vlogService } from "@/services/vlog.service";

// Static data for landing page (server-safe)
const stats = [
  { value: "12K+", label: "Creators onboarded", trend: { value: "24%", positive: true } },
  { value: "45K+", label: "Stories published", trend: { value: "18%", positive: true } },
  { value: "2.1M", label: "Views generated", trend: { value: "42%", positive: true } },
  { value: "96%", label: "Creator satisfaction", trend: { value: "3%", positive: true } },
];

const features = [
  {
    title: "Rich Story Editor",
    description: "Write with focus. A clean, distraction-free editor that puts your words first.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
      </svg>
    ),
    size: "md" as const,
  },
  {
    title: "Cover Image Uploads",
    description: "Drag, drop, and publish. Every story deserves a stunning cover.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
    ),
    size: "sm" as const,
  },
  {
    title: "Public Creator Profiles",
    description: "Your own space. Showcase your stories, stats, and personality.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    size: "sm" as const,
  },
  {
    title: "Real-time Analytics",
    description: "Track views, likes, and engagement. Know what resonates with your audience.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    size: "sm" as const,
  },
  {
    title: "Likes & Engagement",
    description: "Build community. Readers can like, share, and follow your journey.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    size: "sm" as const,
  },
  {
    title: "Discovery Feed",
    description: "Find your next favorite creator. A curated feed of stories tailored to you.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    size: "md" as const,
  },
];

const testimonials = [
  {
    quote: "Snapora changed how I share my photography journey. The focus on storytelling over algorithms is exactly what creators need.",
    name: "Alex Chen",
    role: "Travel Photographer",
    initials: "AC",
  },
  {
    quote: "I've tried every platform out there. Snapora is the first that actually makes me want to write. It's like Medium met Linear.",
    name: "Sarah Kim",
    role: "Product Designer",
    initials: "SK",
  },
  {
    quote: "The analytics alone are worth it. I can see exactly what my audience loves and create more of it. Pure gold.",
    name: "Marcus Johnson",
    role: "Tech Blogger",
    initials: "MJ",
  },
];

export default async function LandingPage() {
  const featuredStories = await vlogService.getFeaturedStories();
  return (
    <div className="flex flex-col">

      {/* ──────── HERO ──────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/3 via-purple-500/3 to-pink-500/3 blur-3xl" />
        </div>

        <Container className="relative z-10 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="flex justify-center mb-6 animate-fade-in">
              <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-medium gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Now in public beta
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance animate-slide-up">
              Share stories{" "}
              <GradientText>people actually remember.</GradientText>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Turn moments, journeys, and ideas into visual stories that captivate.
              No algorithms. No distractions. Just pure storytelling.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-shadow">
                  Start creating free
                </Button>
              </Link>
              <Link href="/vlogs">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Explore stories
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Button>
              </Link>
            </div>

            {/* Preview */}
            <div className="mt-16 relative animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="relative mx-auto max-w-5xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                <div className="h-[300px] sm:h-[400px] lg:h-[500px] bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground text-sm">Your story starts here</p>
                    <p className="text-foreground font-semibold mt-1">What will you create today?</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 bg-card border border-border rounded-xl px-4 py-3 shadow-lg z-20 hidden sm:block">
                <p className="text-xs text-muted-foreground">Join</p>
                <p className="font-bold text-foreground">12,000+</p>
                <p className="text-xs text-muted-foreground">creators</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ──────── SOCIAL PROOF ──────── */}
      <Section variant="muted">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>
      </Section>

      {/* ──────── FEATURED STORIES ──────── */}
      <Section
        title="Featured stories"
        subtitle="Handpicked content from our growing community of creators."
        action={
          <Link href="/vlogs">
            <Button variant="ghost" className="gap-2">
              View all stories
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStories.length > 0 ? (
            featuredStories.map((vlog) => (
              <VlogCard key={vlog.id} vlog={vlog} />
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="group block overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="h-48 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center">
                  <span className="text-muted-foreground/40 text-sm">No stories yet</span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))
          )}
        </div>
      </Section>

      {/* ──────── FEATURED CREATORS ──────── */}
      <Section
        title="Featured creators"
        subtitle="Meet the storytellers building on Snapora."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { id: "1", name: "Aria Patel", username: "ariacreates", storyCount: 24 },
            { id: "2", name: "James Chen", username: "jamesjourney", storyCount: 18 },
            { id: "3", name: "Luna Torres", username: "lunawrites", storyCount: 31 },
          ].map((creator) => (
            <CreatorCard key={creator.id} {...creator} image={null} />
          ))}
        </div>
      </Section>

      {/* ──────── FEATURES (Bento Grid) ──────── */}
      <Section
        title="Everything you need to create"
        subtitle="A powerful platform designed for modern creators."
        variant="muted"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={[
                "group relative rounded-xl border border-border bg-card p-6 sm:p-8",
                "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
                feature.size === "md" ? "md:col-span-2" : "md:col-span-1",
                i === features.length - 1 ? "md:col-span-3" : "",
              ].join(" ")}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ──────── TESTIMONIALS ──────── */}
      <Section
        title="Loved by creators"
        subtitle="Hear from the people already building on Snapora."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-muted-foreground leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-500 text-primary-foreground flex items-center justify-center font-semibold text-xs">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ──────── FINAL CTA ──────── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground text-balance">
              Ready to share your story?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Join thousands of creators already using Snapora. It&apos;s free to start, and always will be.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-10 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-shadow">
                  Get started free
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Sign in
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              No credit card required · Free forever · Cancel anytime
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
