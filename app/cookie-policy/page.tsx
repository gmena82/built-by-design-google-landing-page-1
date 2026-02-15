import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Built By Design KC",
  description:
    "Cookie policy for the Built By Design KC Google Ads landing page.",
};

export default function CookiePolicyPage() {
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
            aria-label="Close cookie policy and return to landing page"
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
            Cookie Policy
          </h1>
          <p className="text-sm text-slate-600">
            Effective date: October 22, 2025
            <br />
            Last updated: February 15, 2026
          </p>
          <p className="text-slate-700">
            This Cookie Policy applies to this Google Ads landing page and explains how cookies
            and similar technologies are used.
          </p>
          <p className="text-slate-700">
            This page is adapted from the primary cookie policy at{" "}
            <a
              href="https://builtbydesignkc.com/policy/cookies/"
              className="font-semibold text-[var(--color-brand-navy)] underline underline-offset-2"
            >
              builtbydesignkc.com/policy/cookies/
            </a>
            .
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            What Are Cookies
          </h2>
          <p className="text-slate-700">
            Cookies are small text files placed on your device to help websites function and to
            collect information about performance and usage.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Categories We Use
          </h2>
          <ul className="list-disc space-y-1 pl-6 text-slate-700">
            <li>
              <strong>Strictly Necessary:</strong> required for core site operation and security.
            </li>
            <li>
              <strong>Analytics:</strong> helps us understand site and campaign performance.
            </li>
            <li>
              <strong>Advertising:</strong> supports conversion measurement and ad attribution.
            </li>
            <li>
              <strong>Functional/Personalization:</strong> remembers user settings and preferences.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Google Consent Mode v2
          </h2>
          <p className="text-slate-700">
            This landing page uses Consent Mode v2 signals for Google tags. By default,
            non-essential consent signals are denied until you choose your preferences in the
            cookie banner.
          </p>
          <p className="text-slate-700">
            Consent signals in use include `ad_storage`, `analytics_storage`, `ad_user_data`, and
            `ad_personalization`, along with functionality/personalization/security storage
            controls.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Managing Your Preferences
          </h2>
          <p className="text-slate-700">
            You can accept, reject, or customize non-essential cookies from the cookie banner.
            You may also manage cookies through your browser settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
            Contact
          </h2>
          <p className="text-slate-700">
            For cookie or privacy questions:
            <br />
            Email:{" "}
            <a
              href="mailto:builtbydesign@builtbydesignkc.com"
              className="text-[var(--color-brand-navy)] underline"
            >
              builtbydesign@builtbydesignkc.com
            </a>
            <br />
            Phone:{" "}
            <a href="tel:+19137826311" className="text-[var(--color-brand-navy)] underline">
              (913) 782-6311
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}

