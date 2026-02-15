"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type ConsentState = {
  ad_storage: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  functionality_storage: "granted" | "denied";
  personalization_storage: "granted" | "denied";
  security_storage: "granted";
};

const CONSENT_STORAGE_KEY = "bbd_cookie_consent_v1";

const DENIED_CONSENT: ConsentState = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted",
};

const GRANTED_CONSENT: ConsentState = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  functionality_storage: "granted",
  personalization_storage: "granted",
  security_storage: "granted",
};

function pushConsentUpdate(consent: ConsentState) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  const gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  gtag("consent", "update", consent);
}

function saveConsent(consent: ConsentState) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Ignore storage write failures (e.g. private mode restrictions).
  }
}

function normalizeStoredConsent(parsed: unknown): ConsentState | null {
  if (!parsed || typeof parsed !== "object") {
    return null;
  }

  const source = parsed as Partial<Record<keyof ConsentState, string>>;
  const normalized: ConsentState = {
    ad_storage: source.ad_storage === "granted" ? "granted" : "denied",
    analytics_storage: source.analytics_storage === "granted" ? "granted" : "denied",
    ad_user_data: source.ad_user_data === "granted" ? "granted" : "denied",
    ad_personalization: source.ad_personalization === "granted" ? "granted" : "denied",
    functionality_storage:
      source.functionality_storage === "granted" ? "granted" : "denied",
    personalization_storage:
      source.personalization_storage === "granted" ? "granted" : "denied",
    security_storage: "granted",
  };

  return normalized;
}

export function CookieConsentBanner() {
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(false);
  const [allowAds, setAllowAds] = useState(false);
  const [allowFunctional, setAllowFunctional] = useState(false);

  useEffect(() => {
    let existing: string | null = null;
    try {
      existing = localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
      setIsVisible(true);
      setIsReady(true);
      return;
    }

    if (!existing) {
      setIsVisible(true);
      setIsReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(existing);
      const normalized = normalizeStoredConsent(parsed);
      if (!normalized) {
        setIsVisible(true);
        setIsReady(true);
        return;
      }

      // Re-apply persisted consent to guarantee current-session enforcement.
      pushConsentUpdate(normalized);

      setAllowAnalytics(normalized.analytics_storage === "granted");
      setAllowAds(
        normalized.ad_storage === "granted" &&
          normalized.ad_user_data === "granted" &&
          normalized.ad_personalization === "granted",
      );
      setAllowFunctional(
        normalized.functionality_storage === "granted" &&
          normalized.personalization_storage === "granted",
      );
    } catch {
      setIsVisible(true);
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    const onOpenConsent = () => {
      setIsCustomizing(true);
      setIsVisible(true);
    };

    window.addEventListener("open-cookie-consent", onOpenConsent);
    return () => window.removeEventListener("open-cookie-consent", onOpenConsent);
  }, []);

  const customConsent = useMemo<ConsentState>(
    () => ({
      ad_storage: allowAds ? "granted" : "denied",
      analytics_storage: allowAnalytics ? "granted" : "denied",
      ad_user_data: allowAds ? "granted" : "denied",
      ad_personalization: allowAds ? "granted" : "denied",
      functionality_storage: allowFunctional ? "granted" : "denied",
      personalization_storage: allowFunctional ? "granted" : "denied",
      security_storage: "granted",
    }),
    [allowAds, allowAnalytics, allowFunctional],
  );

  if (!isReady || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-300 bg-white shadow-2xl">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-8">
        <p className="text-sm font-semibold text-[var(--color-brand-navy)]">Cookie Preferences</p>
        <p className="mt-1 text-sm text-slate-700">
          We use cookies to keep this site secure and, with your permission, to measure ad and
          analytics performance.{" "}
          <Link href="/cookie-policy" className="font-semibold underline underline-offset-2">
            View Cookie Policy
          </Link>
          .
        </p>

        {isCustomizing ? (
          <div className="mt-4 grid gap-3 rounded-lg border border-slate-200 p-4 text-sm text-slate-700 md:grid-cols-3">
            <label className="flex items-start gap-2">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <strong>Strictly Necessary</strong>
                <br />
                Required for core site operation.
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={allowAnalytics}
                onChange={(event) => setAllowAnalytics(event.target.checked)}
                className="mt-1"
              />
              <span>
                <strong>Analytics</strong>
                <br />
                Helps us measure site and campaign performance.
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={allowAds}
                onChange={(event) => setAllowAds(event.target.checked)}
                className="mt-1"
              />
              <span>
                <strong>Advertising</strong>
                <br />
                Enables ad attribution and personalization signals.
              </span>
            </label>
            <label className="flex items-start gap-2 md:col-span-3">
              <input
                type="checkbox"
                checked={allowFunctional}
                onChange={(event) => setAllowFunctional(event.target.checked)}
                className="mt-1"
              />
              <span>
                <strong>Functional Personalization</strong>
                <br />
                Remembers your on-site preferences.
              </span>
            </label>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              pushConsentUpdate(DENIED_CONSENT);
              saveConsent(DENIED_CONSENT);
              setIsVisible(false);
            }}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={() => {
              pushConsentUpdate(GRANTED_CONSENT);
              saveConsent(GRANTED_CONSENT);
              setIsVisible(false);
            }}
            className="rounded-md bg-[var(--color-brand-gold-light)] px-4 py-2 text-sm font-semibold text-[var(--color-brand-navy)] transition hover:bg-[#f6e6a8]"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => {
              if (!isCustomizing) {
                setIsCustomizing(true);
                return;
              }
              pushConsentUpdate(customConsent);
              saveConsent(customConsent);
              setIsVisible(false);
            }}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {isCustomizing ? "Save Preferences" : "Customize"}
          </button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
