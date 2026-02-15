import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Built By Design KC",
  description:
    "Terms of Service for the Built By Design KC Google Ads landing page.",
};

export default function TermsOfServicePage() {
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
            aria-label="Close terms of service and return to landing page"
          >
            Close Terms
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 md:px-8 md:py-14">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Built By Design KC
          </p>
          <h1 className="font-serif-display text-4xl text-[var(--color-brand-navy)]">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-600">
            Effective date: October 22, 2025
            <br />
            Last updated: February 15, 2026
          </p>
          <p className="text-slate-700">
            These Terms of Service govern your use of this Google Ads landing page and related
            services provided by Built By Design LLC.
          </p>
          <p className="text-slate-700">
            This page is adapted from the primary terms at{" "}
            <a
              href="https://builtbydesignkc.com/policy/terms-of-service/"
              className="font-semibold text-[var(--color-brand-navy)] underline underline-offset-2"
            >
              builtbydesignkc.com/policy/terms-of-service/
            </a>{" "}
            and tailored for this ad landing experience.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Acceptance of Terms
          </h2>
          <p className="text-slate-700">
            By using this landing page, submitting a form, or contacting us through this page, you
            agree to these Terms and applicable laws. If you do not agree, do not use this page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Permitted Use
          </h2>
          <p className="text-slate-700">You agree not to:</p>
          <ul className="list-disc space-y-1 pl-6 text-slate-700">
            <li>Use this page for unlawful, fraudulent, abusive, or disruptive purposes</li>
            <li>Attempt to interfere with site operation, security, or infrastructure</li>
            <li>Submit false, misleading, or unauthorized third-party information</li>
            <li>Copy or republish site content without permission</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Lead Submissions and Communications
          </h2>
          <p className="text-slate-700">
            By submitting your information, you represent that it is accurate and that you are
            authorized to provide it. You consent to communications from Built By Design LLC about
            your inquiry, including by phone, email, and text, where permitted by law.
          </p>
          <p className="text-slate-700">
            Message and data rates may apply for carrier-based communications. You may opt out of
            text communications by replying with standard opt-out keywords such as STOP.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Intellectual Property
          </h2>
          <p className="text-slate-700">
            All content on this page, including branding, text, graphics, and layout, is owned by
            or licensed to Built By Design LLC and protected by applicable intellectual property
            laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Third-Party Services
          </h2>
          <p className="text-slate-700">
            This page may rely on third-party providers (for example, form processing, hosting,
            analytics, and advertising platforms). Their terms and privacy policies may also apply.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            No Warranty
          </h2>
          <p className="text-slate-700">
            This page and its materials are provided on an "as is" and "as available" basis,
            without warranties of any kind, to the maximum extent permitted by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Limitation of Liability
          </h2>
          <p className="text-slate-700">
            To the fullest extent permitted by law, Built By Design LLC is not liable for indirect,
            incidental, special, consequential, or punitive damages arising out of your use of this
            page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Changes to These Terms
          </h2>
          <p className="text-slate-700">
            We may update these Terms at any time. Updates are effective when posted on this page.
            Continued use of this landing page after updates means you accept the revised Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Governing Law
          </h2>
          <p className="text-slate-700">
            These Terms are governed by the laws of Kansas, USA, without regard to conflict of
            law principles.
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
