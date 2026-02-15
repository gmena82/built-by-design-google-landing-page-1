"use server";

import { headers } from "next/headers";
import { leadFormSchema } from "@/lib/types/lead-form-schema";

export type LeadActionState = {
  success: boolean;
  message: string;
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykdwgle";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;
const submissionLogByIp = new Map<string, number[]>();

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return h.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const previous = submissionLogByIp.get(ip) ?? [];
  const recent = previous.filter((timestamp) => timestamp >= windowStart);

  if (recent.length >= RATE_LIMIT_MAX_SUBMISSIONS) {
    submissionLogByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissionLogByIp.set(ip, recent);
  return false;
}

export async function submitLeadForm(
  _prevState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const clientIp = await getClientIp();
  if (isRateLimited(clientIp)) {
    return {
      success: false,
      message: "Too many requests. Please wait a few minutes and try again.",
    };
  }

  const parsed = leadFormSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    projectType: formData.get("projectType"),
    zipCode: formData.get("zipCode"),
    gclid: formData.get("gclid"),
    wbraid: formData.get("wbraid"),
    gbraid: formData.get("gbraid"),
    utm_source: formData.get("utm_source"),
    utm_medium: formData.get("utm_medium"),
    utm_campaign: formData.get("utm_campaign"),
    utm_term: formData.get("utm_term"),
    utm_content: formData.get("utm_content"),
    landingPageUrl: formData.get("landingPageUrl"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please review your entries.",
    };
  }

  // Honeypot: treat as success without creating a lead.
  if (parsed.data.website?.trim()) {
    return {
      success: true,
      message: "Request received.",
    };
  }

  const h = await headers();
  const userAgent = h.get("user-agent") ?? "";
  const submittedAtIso = new Date().toISOString();

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        projectType: parsed.data.projectType,
        zipCode: parsed.data.zipCode,
        gclid: parsed.data.gclid ?? "",
        wbraid: parsed.data.wbraid ?? "",
        gbraid: parsed.data.gbraid ?? "",
        utm_source: parsed.data.utm_source ?? "",
        utm_medium: parsed.data.utm_medium ?? "",
        utm_campaign: parsed.data.utm_campaign ?? "",
        utm_term: parsed.data.utm_term ?? "",
        utm_content: parsed.data.utm_content ?? "",
        landingPageUrl: parsed.data.landingPageUrl ?? "",
        submittedAtIso,
        clientIp,
        userAgent,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Unable to send your request right now. Please try again.",
      };
    }
  } catch {
    return {
      success: false,
      message: "Unable to send your request right now. Please try again.",
    };
  }

  return {
    success: true,
    message: "Request received. A designer will contact you shortly.",
  };
}
