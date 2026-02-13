"use server";

import { leadFormSchema } from "@/lib/types/lead-form-schema";

export type LeadActionState = {
  success: boolean;
  message: string;
};

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

  return {
    success: true,
    message: "Request received. A designer will contact you shortly.",
  };
}
