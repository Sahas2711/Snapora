import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Community Guidelines - Snapora",
  description: "Community Guidelines for Snapora — a safe, respectful platform for creators and storytellers.",
};

const guidelines = [
  {
    title: "Respect Others",
    description:
      "Treat every member of the Snapora community with respect and kindness. We welcome diverse perspectives and constructive discussions, but personal attacks, insults, and demeaning language will not be tolerated. Disagree respectfully and focus on the content, not the person.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "No Harassment",
    description:
      "Harassment in any form is strictly prohibited. This includes targeted bullying, stalking, intimidation, unwanted sexual advances, and encouraging others to harass a member. If someone asks you to stop, stop. Creating accounts specifically to harass others will result in immediate termination.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "No Hate Speech",
    description:
      "Snapora does not allow content that promotes or incites hatred, violence, or discrimination against individuals or groups based on race, ethnicity, religion, gender, sexual orientation, disability, age, nationality, or any other protected characteristic. This includes symbols, imagery, and coded language associated with hate groups.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    title: "No Explicit Content",
    description:
      "Do not publish pornographic, sexually explicit, or overly graphic violent content. Snapora is a platform for storytelling and creative expression, not adult content. Nudity in artistic, educational, or documentary contexts may be allowed at our discretion, but must be clearly marked as sensitive.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.122-7.426a6.75 6.75 0 010 9.55M9.348 14.652a3.75 3.75 0 01-5.304 0m7.426-2.122a6.75 6.75 0 00-9.55 0" />
      </svg>
    ),
  },
  {
    title: "No Spam",
    description:
      "Do not use Snapora for spam, scams, phishing, or deceptive practices. This includes excessive self-promotion, posting irrelevant links, distributing malware, impersonating others, and creating fake accounts to artificially inflate engagement. Genuine, valuable content is always welcome.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: "Copyright Rules",
    description:
      "Only publish content that you have created or have explicit permission to use. Respect the intellectual property of others. If you believe your copyrighted work has been used without authorization, you can report it to us. Repeated copyright infringement will result in account termination.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Safety Rules",
    description:
      "Do not share personal information about yourself or others, including addresses, phone numbers, financial details, or private communications. Do not engage in doxxing or encourage others to share private information. Report any safety concerns to our moderation team immediately.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Reporting Violations",
    description:
      "If you see content or behavior that violates these guidelines, please report it to us. Every report is reviewed by our moderation team. You can report content directly from the platform or contact us at support@snapora.com. Your reports are confidential and help keep Snapora safe for everyone.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
    ),
  },
  {
    title: "Enforcement Policy",
    description:
      "Violations of these guidelines result in actions ranging from content removal to account suspension or termination. First-time or minor violations may receive a warning. Severe or repeated violations will result in immediate account termination. We reserve the right to remove any content and suspend any account at our discretion to protect the community.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function GuidelinesPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-3">
              Community
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Community Guidelines
            </h1>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Our guidelines help maintain a safe, respectful, and creative environment for all
              storytellers on Snapora.
            </p>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {guidelines.map((g) => (
              <div
                key={g.title}
                className="flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  {g.icon}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                    {g.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {g.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border text-center">
            <h3 className="text-base font-semibold text-foreground mb-2">
              Have questions or need to report something?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our moderation team is here to help. Reach out to us anytime.
            </p>
            <a
              href="mailto:support@snapora.com"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              support@snapora.com
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          <p className="mt-8 text-xs text-muted-foreground text-center">
            These guidelines were last updated on June 6, 2026. We may update them from time to time
            and will notify the community of significant changes.
          </p>
        </div>
      </Container>
    </div>
  );
}
