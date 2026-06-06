import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms of Service - Snapora",
  description: "Terms of Service for using Snapora, the creator-first storytelling platform.",
};

const sections = [
  {
    title: "1. Introduction",
    content:
      "Welcome to Snapora. By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services. Snapora provides a platform for creators to publish and share visual stories, and by using the service you accept these terms in full.",
  },
  {
    title: "2. User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, current, and complete information during the registration process and keep your account information updated. You must be at least 13 years of age to use Snapora. Accounts registered by automated methods are not permitted.",
  },
  {
    title: "3. User Content",
    content:
      "You retain all ownership rights to the content you publish on Snapora. By submitting content, you grant Snapora a worldwide, non-exclusive, royalty-free license to display, distribute, and promote your content on the platform. You represent and warrant that your content does not violate any third-party rights, including copyright, trademark, or privacy rights.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "The Snapora name, logo, and platform design are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works based on our platform without explicit written permission. All content submitted by users remains the intellectual property of its original creator.",
  },
  {
    title: "5. Prohibited Activities",
    content:
      "You agree not to engage in any of the following prohibited activities: (a) posting content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable; (b) impersonating any person or entity; (c) attempting to gain unauthorized access to our systems; (d) interfering with the proper functioning of the platform; (e) using the platform for spam or unsolicited communications; (f) scraping or harvesting user data without consent.",
  },
  {
    title: "6. Privacy",
    content:
      "Your privacy matters to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using Snapora, you consent to our data practices as described in our Privacy Policy. We do not sell your personal data to third parties.",
  },
  {
    title: "7. Account Termination",
    content:
      "We reserve the right to suspend or terminate accounts that violate these Terms of Service or engage in prohibited activities. You may delete your account at any time through your profile settings. Upon termination, your content may remain accessible on the platform depending on how it has been shared with other users. We are not liable for any loss of data resulting from account termination.",
  },
  {
    title: "8. Disclaimer",
    content:
      "Snapora is provided 'as is' without warranties of any kind, either express or implied. We do not guarantee that the platform will be uninterrupted, secure, or error-free. We are not responsible for the content, actions, or conduct of third-party users of the platform.",
  },
  {
    title: "9. Limitation of Liability",
    content:
      "In no event shall Snapora be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform. Our total liability for any claims under these terms shall not exceed the amount you have paid us in the twelve months preceding the claim.",
  },
  {
    title: "10. Contact Information",
    content:
      "If you have any questions about these Terms of Service, please reach out to us. We value your feedback and are committed to making Snapora a safe and enjoyable platform for all creators.",
    contact: true,
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-3">
              Legal
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Terms of Service
            </h1>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base">
              Last updated: June 6, 2026
            </p>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                  {section.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
                {section.contact && (
                  <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm text-muted-foreground">
                      Email:{" "}
                      <a
                        href="mailto:support@snapora.com"
                        className="text-primary font-medium hover:underline"
                      >
                        support@snapora.com
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Or visit our{" "}
                      <Link href="/" className="text-primary font-medium hover:underline">
                        home page
                      </Link>{" "}
                      for more information.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              These Terms of Service were last updated on June 6, 2026. We may update these terms
              from time to time; we will notify you of material changes via email or through the
              platform.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
