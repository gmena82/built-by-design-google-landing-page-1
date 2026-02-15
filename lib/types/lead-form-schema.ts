import { z } from "zod";

export const leadFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .regex(/^[0-9()+\-\s.]+$/, "Please enter a valid phone number."),
  projectType: z.enum(["Kitchen", "Bath", "Basement", "Addition"], {
    error: "Please select a project type.",
  }),
  zipCode: z
    .string()
    .regex(/^\d{5}$/, "Please enter a valid 5-digit zip code."),
  gclid: z.string().optional(),
  wbraid: z.string().optional(),
  gbraid: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  landingPageUrl: z.string().optional(),
  website: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

