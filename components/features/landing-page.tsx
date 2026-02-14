"use client";

import Image from "next/image";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import {
  CircleCheck,
  Coffee,
  Hammer,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { leadFormSchema, type LeadFormValues } from "@/lib/types/lead-form-schema";
import {
  submitLeadForm,
  type LeadActionState,
} from "@/app/actions/lead-form";
import { galleryImages, featuredGalleryImages } from "@/lib/gallery-data";

const initialLeadState: LeadActionState = {
  success: false,
  message: "",
};

const PHOTOS = {
  hero: "/photos/Hero.webp",
  cta: "/photos/CTA.webp",
  gallery: ["/photos/1.webp", "/photos/2.webp", "/photos/3.webp"] as const,
  logoBlack: "/photos/bbd-black-logo.png",
  logoWhite: "/photos/bbd-white-logo.png",
};

// Gallery items are now imported from gallery-data.ts

const testimonialCards = [
  {
    name: "Emily R.",
    city: "Overland Park",
    quote:
      "Built By Design transformed our outdated kitchen into the space we always wanted. The design process was clear, communication was consistent, and the crew respected our home every single day. We cook and host constantly now because the layout finally works for our family.",
    stars: 5,
    projectPhoto: "/photos/reviews/1-ph.webp",
  },
  {
    name: "James and Alicia T.",
    city: "Leawood",
    quote:
      "Our primary bathroom remodel turned out better than we imagined. The finishes are beautiful, and the team stayed on schedule while keeping us informed through each phase.",
    stars: 5,
    projectPhoto: "/photos/reviews/2-ph.webp",
  },
  {
    name: "Mark D.",
    city: "Olathe",
    quote:
      "We hired Built By Design for a basement finish and they delivered exactly what they promised. Their craftsmanship and attention to detail were excellent, and they handled changes professionally when we requested a few updates mid-project.",
    stars: 5,
    projectPhoto: "/photos/reviews/3-ph.webp",
  },
  {
    name: "Karen L.",
    city: "Lenexa",
    quote:
      "From design to final walkthrough, the experience was smooth and organized. We appreciated the daily updates and how clean the team kept the job site.",
    stars: 5,
    projectPhoto: "/photos/reviews/4-ph.webp",
  },
];
const REVIEW_PREVIEW_CHAR_LIMIT = 140;

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
}: {
  label: string;
  className?: string;
  src?: string;
  fit?: "cover" | "contain";
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
      />
      {!src && <div className="absolute inset-0 bg-slate-900/25" />}
      {showLabel && (
        <p className="absolute bottom-3 left-3 right-3 rounded-md bg-black/65 px-3 py-2 text-sm font-medium text-white">
          {label}
        </p>
      )}
    </div>
  );
}

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

export function LandingPage() {
  const [leadState, formAction] = useActionState(submitLeadForm, initialLeadState);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [reviewCarouselOffset, setReviewCarouselOffset] = useState(0);
  const [isReviewCarouselAnimating, setIsReviewCarouselAnimating] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const reviewCarouselTrack = useMemo(
    () => [...testimonialCards, ...testimonialCards],
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewCarouselOffset((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleReviewTransitionEnd = () => {
    if (reviewCarouselOffset !== testimonialCards.length) {
      return;
    }

    setIsReviewCarouselAnimating(false);
    setReviewCarouselOffset(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsReviewCarouselAnimating(true);
      });
    });
  };

  const {
    register,
    trigger,
    formState: { errors },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!leadState.message) {
      return;
    }

    if (leadState.success) {
      toast.success(leadState.message);
      reset();
    } else {
      toast.error(leadState.message);
    }
  }, [leadState, reset]);

  const lightboxImages = useMemo(
    () => galleryImages,
    [],
  );

  const scrollToForm = () => {
    const target = document.getElementById("lead-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />

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
            <div className="hidden text-right md:block">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Call to Speak with a Designer
              </p>
              <a
                href="tel:+19137826311"
                className="text-lg font-bold text-[var(--color-brand-navy)]"
              >
                (913) 782-6311
              </a>
            </div>
            <button
              type="button"
              onClick={scrollToForm}
              className="rounded-md bg-[var(--color-brand-gold-light)] px-4 py-2 text-sm font-semibold text-[var(--color-brand-navy)] transition hover:bg-[#f6e6a8] md:px-5 md:py-3"
            >
              Get a Free Estimate
            </button>
          </div>
        </div>
      </header>

      <main className="bg-white text-slate-800">
        <section className="relative overflow-hidden bg-[var(--color-brand-navy)]">
          <div className="absolute inset-0">
            <PlaceholderPhoto label="Hero Kitchen or Master Bath" src={PHOTOS.hero} className="h-full rounded-none border-0" />
            <div className="absolute inset-0 bg-[var(--color-brand-navy)]/70" />
          </div>
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
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
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white">
                {heroTrustBadges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1"
                  >
                    <motion.span
                      className="inline-flex text-[var(--color-brand-gold-light)]"
                      animate={{ scale: [1, 1.14, 1] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 3.2,
                        ease: "easeInOut",
                      }}
                    >
                      <badge.icon className="h-4 w-4" />
                    </motion.span>
                    {badge.label}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.form
              id="lead-form"
              ref={formRef}
              action={formAction}
              onSubmit={async (event) => {
                const valid = await trigger();
                if (!valid) {
                  event.preventDefault();
                }
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur"
            >
              <h2 className="font-serif-display text-2xl text-[var(--color-brand-navy)]">
                Start Your Dream Project Today
              </h2>
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
                <FormSubmitButton />
              </div>
            </motion.form>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
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
                <motion.span
                  className="mt-1 inline-flex shrink-0 text-[var(--color-brand-gold-mid)]"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 2.1, ease: "easeInOut" }}
                >
                  <CircleCheck className="h-4 w-4" />
                </motion.span>
                <span>
                  <strong>Constant Communication:</strong> You will never be left in the dark.
                  We prioritize daily updates.
                </span>
              </li>
              <li className="flex gap-2">
                <motion.span
                  className="mt-1 inline-flex shrink-0 text-[var(--color-brand-gold-mid)]"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 2.1, ease: "easeInOut" }}
                >
                  <CircleCheck className="h-4 w-4" />
                </motion.span>
                <span>
                  <strong>Flawless Craftsmanship:</strong> Decades of experience bringing
                  high-end visions to life.
                </span>
              </li>
              <li className="flex gap-2">
                <motion.span
                  className="mt-1 inline-flex shrink-0 text-[var(--color-brand-gold-mid)]"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 2.1, ease: "easeInOut" }}
                >
                  <CircleCheck className="h-4 w-4" />
                </motion.span>
                <span>
                  <strong>Transparent Pricing:</strong> Detailed scopes of work tailored to
                  respect your exact budget.
                </span>
              </li>
            </ul>
          </motion.div>
          <div className="relative h-[340px] w-full overflow-hidden rounded-xl">
            <Image
              src={galleryImages[8].src}
              alt={galleryImages[8].alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </section>

        <section className="bg-[#f8f9fa] py-16">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
            <h2 className="text-center font-serif-display text-3xl text-[var(--color-brand-navy)]">
              Luxury Remodeling Tailored to Your Vision
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Custom Kitchens",
                  description:
                    "From chef-inspired layouts to custom cabinetry, we build kitchens that serve as the breathtaking heart of your home.",
                  image: galleryImages[4], // kitchen-white-wood-island
                },
                {
                  title: "Spa-Like Bathrooms",
                  description:
                    "Turn your daily routine into a private retreat with custom vanities, soaking tubs, and premium fixtures.",
                  image: galleryImages[9], // bathroom-freestanding-tub
                },
                {
                  title: "Finished Basements",
                  description:
                    "Expand your living space with a beautifully finished lower level perfect for entertaining guests or family time.",
                  image: galleryImages[0], // basement-pool-table-hero
                },
              ].map((service) => (
                <article key={service.title} className="rounded-xl bg-white p-4 shadow-sm">
                  <div className="relative h-56 w-full overflow-hidden rounded-xl">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-4 font-serif-display text-2xl text-[var(--color-brand-navy)]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-slate-700">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-brand-navy)] py-16">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
            <h2 className="text-center font-serif-display text-3xl text-white">
              Browse Our Recent Transformations
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredGalleryImages.map((item, idx) => (
                <div key={idx} className="relative h-64 w-full overflow-hidden rounded-xl">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(0);
                  setIsLightboxOpen(true);
                }}
                className="rounded-md bg-[var(--color-brand-gold-light)] px-6 py-3 text-base font-semibold text-[var(--color-brand-navy)] transition hover:bg-[#f6e6a8]"
              >
                View Full Project Gallery
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-16 md:px-8">
          <h2 className="text-center font-serif-display text-3xl text-[var(--color-brand-navy)]">
            Loved by Johnson County Homeowners
          </h2>
          <div className="relative mt-10">
            <div className="overflow-hidden">
              <div
                className={`flex ${
                  isReviewCarouselAnimating ? "transition-transform duration-700 ease-out" : ""
                }`}
                style={{
                  transform: `translateX(-${reviewCarouselOffset * (100 / 3)}%)`,
                }}
                onTransitionEnd={handleReviewTransitionEnd}
              >
                {reviewCarouselTrack.map((review, idx) => (
                  <div key={`${review.name}-${idx}`} className="w-1/3 shrink-0 px-3">
                    <article className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center gap-1 text-[#fbbc04]">
                        {Array.from({ length: review.stars }).map((_, starIdx) => (
                          <Star key={starIdx} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-[var(--color-brand-navy)]">
                        {review.name}
                      </h3>
                      <p className="text-sm font-medium text-slate-500">{review.city}</p>
                      <p className="mt-3 text-slate-700">
                        {expandedReviews[idx % testimonialCards.length] ||
                        review.quote.length <= REVIEW_PREVIEW_CHAR_LIMIT
                          ? review.quote
                          : `${review.quote.slice(0, REVIEW_PREVIEW_CHAR_LIMIT)}...`}
                      </p>
                      {review.quote.length > REVIEW_PREVIEW_CHAR_LIMIT ? (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedReviews((prev) => ({
                              ...prev,
                              [idx % testimonialCards.length]:
                                !prev[idx % testimonialCards.length],
                            }))
                          }
                          className="mt-2 text-sm font-semibold text-[var(--color-brand-navy)] underline underline-offset-2 hover:text-slate-700"
                        >
                          {expandedReviews[idx % testimonialCards.length] ? "Show less" : "Read more"}
                        </button>
                      ) : null}
                      <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-200">
                        <Image
                          src={review.projectPhoto}
                          alt={`Completed project for ${review.name}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-center"
                        />
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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

        <section className="relative overflow-hidden py-20">
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
            <button
              type="button"
              onClick={scrollToForm}
              className="mt-8 rounded-md bg-[var(--color-brand-gold-light)] px-8 py-4 text-lg font-semibold text-[var(--color-brand-navy)] transition hover:bg-[#f6e6a8]"
            >
              Schedule Your Free Consultation
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-[#111111] py-10 text-slate-300">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 md:px-8">
          <div className="relative h-10 w-44">
            <Image
              src={PHOTOS.logoWhite}
              alt="Built By Design KC"
              fill
              sizes="176px"
              className="object-contain object-left"
            />
          </div>
          <p>
            318 N. Overlook Street, Olathe, KS 66061 |{" "}
            <a href="tel:+19137826311" className="text-[var(--color-brand-gold-dark)]">
              (913) 782-6311
            </a>
          </p>
          <p>
            Proudly serving the Greater Kansas City Area, Lenexa, Leawood, Overland Park, and
            Olathe.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-[var(--color-brand-gold-dark)]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--color-brand-gold-dark)]">
              Terms of Service
            </a>
          </div>
          <p className="text-sm">© 2026 Built By Design KC. All Rights Reserved.</p>
        </div>
      </footer>

      {isLightboxOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4">
          <div className="w-full max-w-4xl rounded-xl bg-slate-900 p-4">
            <div className="flex items-center justify-between pb-3">
              <p className="text-sm text-white">
                {lightboxIndex + 1} / {lightboxImages.length}
              </p>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="rounded border border-white/30 px-3 py-1 text-sm text-white"
              >
                Close
              </button>
            </div>
            <div className="relative h-[55vh] w-full overflow-hidden rounded-xl">
              <Image
                src={lightboxImages[lightboxIndex]?.src}
                alt={lightboxImages[lightboxIndex]?.alt ?? "Gallery image"}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1))
                }
                className="rounded bg-[var(--color-brand-gold)] px-4 py-2 font-semibold text-[var(--color-brand-navy)]"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1))
                }
                className="rounded bg-[var(--color-brand-gold)] px-4 py-2 font-semibold text-[var(--color-brand-navy)]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
