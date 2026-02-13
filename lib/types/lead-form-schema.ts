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
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

