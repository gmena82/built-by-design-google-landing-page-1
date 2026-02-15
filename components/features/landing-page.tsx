import Image from "next/image";
import { CircleCheck, Coffee, Hammer, Mail, MapPin, Phone, ShieldCheck, Sparkles, Star, Trophy } from "lucide-react";
import { LeadFormClient } from "@/components/features/lead-form-client";
import { TestimonialsCarouselClient } from "@/components/features/testimonials-carousel-client";
import { GallerySectionClient } from "@/components/features/gallery-section-client";
import {
  OpenCookieSettingsButton,
  ScrollToFormButton,
  TrackedCallLink,
  TrackedEmailLink,
} from "@/components/features/interaction-trackers";

const PHOTOS = {
  hero: "/photos/Hero.webp",
  cta: "/photos/CTA.webp",
  logoBlack: "/photos/bbd-black-logo.png",
  logoWhite: "/photos/bbd-white-logo.png",
};

const processSteps = [
  {
    title: "Consultation",
    description:
      "We listen to your goals, assess your space, and discuss your budget.",
    icon: Coffee,
  },
  {
    title: "Custom Design",
    description:
      "We create detailed 3D plans and help you select premium materials.",
    icon: MapPin,
  },
  {
    title: "Construction",
    description:
      "Our professional crew builds your space with minimal disruption and daily communication.",
    icon: Hammer,
  },
  {
    title: "The Reveal",
    description:
      "Step into your newly remodeled, flawlessly finished space.",
    icon: Sparkles,
  },
];

const heroTrustBadges = [
  { label: "5-Star Houzz Rated", icon: Star },
  { label: "REMY Award Winners", icon: Trophy },
  { label: "Fully Licensed and Insured", icon: ShieldCheck },
];

function PlaceholderPhoto({
  label,
  className,
  src,
  fit = "cover",
  priority = false,
}: {
  label: string;
  className?: string;
  src?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
}) {
  const imageSrc = src ?? "/placeholder-photo.svg";
  const showLabel = !src;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/20 bg-slate-300/30 ${className ?? ""}`}
    >
      <Image
        src={imageSrc}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="opacity-90"
        style={{ objectFit: fit, objectPosition: "center" }}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
      />
      {!src && <div className="absolute inset-0 bg-slate-900/25" />}
      {showLabel ? (
        <p className="absolute bottom-3 left-3 right-3 rounded-md bg-black/65 px-3 py-2 text-sm font-medium text-white">
          {label}
        </p>
      ) : null}
    </div>
  );
}

export function LandingPage() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="relative h-10 w-40">
            <Image
              src={PHOTOS.logoBlack}
              alt="Built By Design KC"
              fill
              sizes="160px"
              className="object-contain object-left"
              priority
            />
          </div>
          <div className="flex items-center gap-4">
            <TrackedCallLink
              href="tel:+19137826311"
              placement="header-mobile"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-[var(--color-brand-navy)] md:hidden"
            >
              Call (913) 782-6311
            </TrackedCallLink>
            <div className="hidden text-right md:block">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Call to Speak with a Designer
              </p>
              <TrackedCallLink
                href="tel:+19137826311"
                placement="header-desktop"
                className="text-lg font-bold text-[var(--color-brand-navy)]"
              >
                (913) 782-6311
              </TrackedCallLink>
              <TrackedEmailLink
                href="mailto:builtbydesign@builtbydesignkc.com"
                placement="header"
                className="block text-sm font-medium text-[var(--color-brand-navy)] hover:underline"
              >
                builtbydesign@builtbydesignkc.com
              </TrackedEmailLink>
            </div>
            <ScrollToFormButton
              type="button"
              ctaName="header_get_free_estimate"
              source="header_cta"
              className="rounded-md bg-[var(--color-brand-gold-light)] px-4 py-2 text-sm font-semibold text-[var(--color-brand-navy)] transition hover:bg-[#f6e6a8] md:px-5 md:py-3"
            >
              Get a Free Estimate
            </ScrollToFormButton>
          </div>
        </div>
      </header>

      <main className="bg-white text-slate-800">
        <section className="relative overflow-hidden bg-[var(--color-brand-navy)]">
          <div className="absolute inset-0">
            <PlaceholderPhoto
              label="Hero Kitchen or Master Bath"
              src={PHOTOS.hero}
              className="h-full rounded-none border-0"
              priority
            />
            <div className="absolute inset-0 bg-[var(--color-brand-navy)]/70" />
          </div>
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <div className="space-y-6">
              <p className="text-sm font-semibold tracking-[0.16em] text-[var(--color-brand-gold-light)]">
                AWARD-WINNING KANSAS CITY REMODELERS
              </p>
              <h1 className="font-serif-display text-4xl leading-tight text-white md:text-5xl">
                Custom Kitchens, Baths and Basements Built Around Your Life.
              </h1>
              <p className="max-w-xl text-lg text-slate-100">
                We transform Johnson County homes with stunning designs, expert craftsmanship,
                and unmatched daily communication.
              </p>
              <p className="text-sm font-semibold tracking-[0.08em] text-[var(--color-brand-gold-light)]">
                Featured in 435 Magazine, The Kansas City Star, &amp; Country Living
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white">
                {heroTrustBadges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1"
                  >
                    <span className="inline-flex text-[var(--color-brand-gold-light)]">
                      <badge.icon className="h-4 w-4" />
                    </span>
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            <LeadFormClient />
          </div>
        </section>

        <section className="bg-[#f8f9fa] py-5">
          <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 text-sm text-slate-700 md:grid-cols-4 md:px-8">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--color-brand-gold-dark)]" />
              Serving Overland Park, Olathe, Leawood and Lenexa
            </p>
            <p className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-[var(--color-brand-gold-dark)]" />
              Multiple REMY Remodel of the Year Awards
            </p>
            <p className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[var(--color-brand-gold-dark)]" />
              5-Star Rated by Local Homeowners
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[var(--color-brand-gold-dark)]" />
              NARI Certified and Fully Insured
            </p>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:px-8">
          <div className="space-y-4">
            <h2 className="font-serif-display text-3xl text-[var(--color-brand-navy)]">
              Not Just Another Contractor. A Partner in Your Home&apos;s Transformation.
            </h2>
            <p className="text-slate-700">
              Remodeling should not be stressful. What makes Built By Design different is our
              absolute dedication to the client relationship. We eliminate surprises so you can
              actually enjoy the process.
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="mt-1 inline-flex shrink-0 text-[var(--color-brand-gold-mid)]">
                  <CircleCheck className="h-4 w-4" />
                </span>
                <span>
                  <strong>Constant Communication:</strong> You will never be left in the dark.
                  We prioritize daily updates.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 inline-flex shrink-0 text-[var(--color-brand-gold-mid)]">
                  <CircleCheck className="h-4 w-4" />
                </span>
                <span>
                  <strong>Flawless Craftsmanship:</strong> Decades of experience bringing
                  high-end visions to life.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 inline-flex shrink-0 text-[var(--color-brand-gold-mid)]">
                  <CircleCheck className="h-4 w-4" />
                </span>
                <span>
                  <strong>Transparent Pricing:</strong> Detailed scopes of work tailored to
                  respect your exact budget.
                </span>
              </li>
            </ul>
          </div>
          <div className="relative h-[340px] w-full overflow-hidden rounded-xl">
            <Image
              src="/photos/finished-wine-rack.webp"
              alt="Finished custom wine rack and storage wall"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </section>

        <GallerySectionClient />
        <TestimonialsCarouselClient />

        <section className="bg-[#f8f9fa] py-16">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
            <h2 className="text-center font-serif-display text-3xl text-[var(--color-brand-navy)]">
              Your Dream Space in 4 Simple Steps
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-4">
              {processSteps.map((step) => (
                <article key={step.title} className="rounded-xl bg-white p-5 shadow-sm">
                  <step.icon className="h-8 w-8 text-[var(--color-brand-gold-dark)]" />
                  <h3 className="mt-3 font-serif-display text-2xl text-[var(--color-brand-navy)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-slate-700">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-28">
          <div className="absolute inset-0">
            <PlaceholderPhoto
              label="Final CTA Interior or Exterior"
              src={PHOTOS.cta}
              className="h-full rounded-none border-0"
            />
            <div className="absolute inset-0 bg-[var(--color-brand-navy)]/80" />
          </div>
          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center md:px-8">
            <h2 className="font-serif-display text-4xl text-white">Ready to Build Something Beautiful?</h2>
            <p className="mt-3 text-slate-100">
              Our calendar fills up quickly. Do not wait to start your next project. Contact
              Built By Design today.
            </p>
            <ScrollToFormButton
              type="button"
              ctaName="final_schedule_consultation"
              source="final_cta"
              className="mt-8 rounded-md bg-[var(--color-brand-gold-light)] px-8 py-4 text-lg font-semibold text-[var(--color-brand-navy)] transition hover:bg-[#f6e6a8]"
            >
              Schedule Your Free Consultation
            </ScrollToFormButton>
          </div>
        </section>
      </main>

      <footer className="bg-[#111111] text-slate-300">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="border-t border-white/10 py-12">
            <div className="mb-8 flex justify-center md:justify-start">
              <div className="relative h-10 w-44">
                <Image
                  src={PHOTOS.logoWhite}
                  alt="Built By Design KC"
                  fill
                  sizes="176px"
                  className="object-contain object-left"
                />
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <div className="text-sm leading-relaxed text-slate-300">
                  <p>9393 W 110th St Suite 500</p>
                  <p>Overland Park</p>
                  <p>KS 66210</p>
                </div>

                <TrackedCallLink
                  href="tel:+19137826311"
                  placement="footer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-gold-light)] transition hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  (913) 782-6311
                </TrackedCallLink>
              </div>

              <div className="space-y-4 md:justify-self-end md:text-right">
                <p className="text-sm text-slate-300">
                  <span className="block">Proudly serving the Greater Kansas City Area</span>
                  <span className="block">Lenexa, Leawood</span>
                  <span className="block">Overland Park, and Olathe.</span>
                </p>

                <TrackedEmailLink
                  href="mailto:builtbydesign@builtbydesignkc.com"
                  placement="footer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-gold-light)] transition hover:text-white md:justify-end"
                >
                  <Mail className="h-4 w-4" />
                  builtbydesign@builtbydesignkc.com
                </TrackedEmailLink>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <a href="/privacy-policy" className="transition hover:text-[var(--color-brand-gold-light)]">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="transition hover:text-[var(--color-brand-gold-light)]">
                Terms of Service
              </a>
              <a href="/cookie-policy" className="transition hover:text-[var(--color-brand-gold-light)]">
                Cookie Policy
              </a>
              <OpenCookieSettingsButton
                type="button"
                className="cursor-pointer transition hover:text-[var(--color-brand-gold-light)]"
              >
                Cookie Settings
              </OpenCookieSettingsButton>
            </div>
          </div>

          <div className="border-t border-white/10 py-4">
            <p className="text-xs text-slate-500">
              {"\u00A9"} {currentYear} Built By Design KC. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

