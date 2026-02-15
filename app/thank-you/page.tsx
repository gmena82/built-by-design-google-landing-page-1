import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Thank You | Built By Design KC",
  description: "Thanks for your consultation request. A designer will contact you shortly.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Script
        id="thank-you-lead-event"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              if (typeof window === "undefined") return;
              if (sessionStorage.getItem("bbd_conversion_fired") === "1") return;
              sessionStorage.setItem("bbd_conversion_fired", "1");

              window.dataLayer = window.dataLayer || [];
              var readAttribution = function (key) {
                try {
                  return localStorage.getItem("bbd_attribution_" + key) || "";
                } catch (_e) {
                  return "";
                }
              };
              window.dataLayer.push({
                event: "lead_submitted",
                lead_type: "google_ads_landing_form",
                gclid: readAttribution("gclid"),
                wbraid: readAttribution("wbraid"),
                gbraid: readAttribution("gbraid"),
                utm_source: readAttribution("utm_source"),
                utm_medium: readAttribution("utm_medium"),
                utm_campaign: readAttribution("utm_campaign"),
                utm_term: readAttribution("utm_term"),
                utm_content: readAttribution("utm_content"),
                page_path: window.location.pathname,
                page_location: window.location.href
              });
            })();
          `,
        }}
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-20 text-center md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
          Built By Design KC
        </p>
        <h1 className="mt-4 font-serif-display text-4xl text-[var(--color-brand-navy)] md:text-5xl">
          Thank You
        </h1>
        <p className="mt-4 text-lg text-slate-700">
          Your request has been received. A designer will contact you shortly.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-md bg-[var(--color-brand-gold-light)] px-6 py-3 text-base font-semibold text-[var(--color-brand-navy)] transition hover:bg-[#f6e6a8]"
        >
          {"<- Back to Landing Page"}
        </Link>
      </div>
    </main>
  );
}
