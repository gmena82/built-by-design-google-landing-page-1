"use server";

import { leadFormSchema } from "@/lib/types/lead-form-schema";

export type LeadActionState = {
  success: boolean;
  message: string;
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykdwgle";

export async function submitLeadForm(
  _prevState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = leadFormSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    projectType: formData.get("projectType"),
    zipCode: formData.get("zipCode"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please review your entries.",
    };
  }

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
