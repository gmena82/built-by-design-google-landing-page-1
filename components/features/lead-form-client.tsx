"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { leadFormSchema, type LeadFormValues } from "@/lib/types/lead-form-schema";
import { submitLeadForm, type LeadActionState } from "@/app/actions/lead-form";

const initialLeadState: LeadActionState = {
  success: false,
  message: "",
};

const ATTRIBUTION_KEYS = [
  "gclid",
  "wbraid",
  "gbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

function FormSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-[var(--color-brand-gold-light)] px-5 py-4 text-base font-semibold text-[var(--color-brand-navy)] transition hover:bg-[#f6e6a8] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Submitting..." : "Request Free Consultation ->"}
    </button>
  );
}

export function LeadFormClient() {
  const router = useRouter();
  const [leadState, formAction] = useActionState(submitLeadForm, initialLeadState);

  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    for (const key of ATTRIBUTION_KEYS) {
      const storageKey = `bbd_attribution_${key}`;
      const incoming = params.get(key);
      const stored = localStorage.getItem(storageKey);
      const value = incoming ?? stored ?? "";

      if (incoming) {
        localStorage.setItem(storageKey, incoming);
      }

      setValue(key, value, { shouldDirty: false, shouldTouch: false });
    }

    setValue("landingPageUrl", window.location.href, {
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [setValue]);

  useEffect(() => {
    if (!leadState.message) return;

    if (leadState.success) {
      router.push("/thank-you");
    } else {
      toast.error(leadState.message);
    }
  }, [leadState, router]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <form
        id="lead-form"
        action={formAction}
        onSubmit={async (event) => {
          const valid = await trigger();
          if (!valid) {
            event.preventDefault();
          }
        }}
        className="rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur"
      >
        <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
          Start Your Dream Project Today
        </h2>
        <p className="mt-3 text-xs text-slate-600">
          By submitting, you agree to our{" "}
          <a href="/terms-of-service" className="underline underline-offset-2">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <input
              {...register("fullName")}
              name="fullName"
              placeholder="First and Last Name"
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand-gold-dark)] transition focus:ring-2"
            />
            {errors.fullName ? (
              <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
            ) : null}
          </div>
          <div>
            <input
              {...register("email")}
              name="email"
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand-gold-dark)] transition focus:ring-2"
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            ) : null}
          </div>
          <div>
            <input
              {...register("phone")}
              name="phone"
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand-gold-dark)] transition focus:ring-2"
            />
            {errors.phone ? (
              <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
            ) : null}
          </div>
          <div>
            <select
              {...register("projectType")}
              name="projectType"
              defaultValue=""
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand-gold-dark)] transition focus:ring-2"
            >
              <option value="" disabled>
                Project Type
              </option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bath">Bath</option>
              <option value="Basement">Basement</option>
              <option value="Addition">Addition</option>
            </select>
            {errors.projectType ? (
              <p className="mt-1 text-xs text-red-600">{errors.projectType.message}</p>
            ) : null}
          </div>
          <div>
            <input
              {...register("zipCode")}
              name="zipCode"
              inputMode="numeric"
              placeholder="Zip Code"
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand-gold-dark)] transition focus:ring-2"
            />
            {errors.zipCode ? (
              <p className="mt-1 text-xs text-red-600">{errors.zipCode.message}</p>
            ) : null}
          </div>

          <input type="hidden" {...register("gclid")} name="gclid" />
          <input type="hidden" {...register("wbraid")} name="wbraid" />
          <input type="hidden" {...register("gbraid")} name="gbraid" />
          <input type="hidden" {...register("utm_source")} name="utm_source" />
          <input type="hidden" {...register("utm_medium")} name="utm_medium" />
          <input type="hidden" {...register("utm_campaign")} name="utm_campaign" />
          <input type="hidden" {...register("utm_term")} name="utm_term" />
          <input type="hidden" {...register("utm_content")} name="utm_content" />
          <input type="hidden" {...register("landingPageUrl")} name="landingPageUrl" />
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
              name="website"
            />
          </div>

          <FormSubmitButton />
        </div>
      </form>
    </>
  );
}

