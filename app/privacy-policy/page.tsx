import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Built By Design KC",
  description:
    "Privacy policy for the Built By Design KC Google Ads landing page.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <Link
            href="/"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {"<- Back to Landing Page"}
          </Link>
          <Link
            href="/"
            className="rounded-md bg-[var(--color-brand-gold-light)] px-4 py-2 text-sm font-semibold text-[var(--color-brand-navy)] transition hover:bg-[#f6e6a8]"
            aria-label="Close privacy policy and return to landing page"
          >
            Close Policy
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 md:px-8 md:py-14">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Built By Design KC
          </p>
          <h1 className="font-serif-display text-4xl text-[var(--color-brand-navy)]">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-600">
            Effective date: October 22, 2025
            <br />
            Last updated: February 15, 2026
          </p>
          <p className="text-slate-700">
            This Privacy Policy applies to this Google Ads landing page and explains how Built By
            Design LLC collects, uses, and shares information when you visit this page or submit
            the consultation form.
          </p>
          <p className="text-slate-700">
            This page is adapted from the primary policy at{" "}
            <a
              href="https://builtbydesignkc.com/policy/privacy-policy/"
              className="font-semibold text-[var(--color-brand-navy)] underline underline-offset-2"
            >
              builtbydesignkc.com/policy/privacy-policy/
            </a>{" "}
            and tailored for this ad landing experience.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Information We Collect
          </h2>
          <p className="text-slate-700">
            If you submit the lead form, we collect the information you provide:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-slate-700">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Project type</li>
            <li>ZIP code</li>
          </ul>
          <p className="text-slate-700">
            We may also collect technical data such as IP address, browser type, device type,
            pages viewed, referring URLs, and timestamps through standard web logs and analytics
            technologies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            How We Use Information
          </h2>
          <ul className="list-disc space-y-1 pl-6 text-slate-700">
            <li>Respond to your consultation request</li>
            <li>Contact you by phone, email, or text about your project</li>
            <li>Operate and improve the landing page experience</li>
            <li>Measure ad and campaign performance</li>
            <li>Maintain security and prevent abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Sharing and Service Providers
          </h2>
          <p className="text-slate-700">
            We do not sell your personal information. We may share information with service
            providers that help us operate this landing page and process leads, including:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-slate-700">
            <li>Form processing provider: Formspree</li>
            <li>Hosting and infrastructure providers</li>
            <li>Advertising and analytics platforms used for campaign measurement</li>
          </ul>
          <p className="text-slate-700">
            We may also disclose information when required by law or to protect rights, safety,
            and property.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Cookies and Tracking
          </h2>
          <p className="text-slate-700">
            This landing page may use cookies and similar technologies to support site operation,
            understand performance, and attribute ad traffic. You can control cookies through your
            browser settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Data Retention
          </h2>
          <p className="text-slate-700">
            We retain personal information only as long as reasonably necessary for lead follow-up,
            business operations, legal compliance, and dispute resolution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Your Choices
          </h2>
          <p className="text-slate-700">
            You may request access, correction, or deletion of your personal information, subject
            to applicable law. You may also opt out of marketing communications at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Children&apos;s Privacy
          </h2>
          <p className="text-slate-700">
            This landing page is not directed to children under 13, and we do not knowingly
            collect personal information from children under 13.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Contact Us
          </h2>
          <p className="text-slate-700">
            Built By Design LLC
            <br />
            9393 W 110th St Suite 500, Overland Park, KS 66210
            <br />
            Phone:{" "}
            <a href="tel:+19137826311" className="text-[var(--color-brand-navy)] underline">
              (913) 782-6311
            </a>
            <br />
            Email:{" "}
            <a
              href="mailto:builtbydesign@builtbydesignkc.com"
              className="text-[var(--color-brand-navy)] underline"
            >
              builtbydesign@builtbydesignkc.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
