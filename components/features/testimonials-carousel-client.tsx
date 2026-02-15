"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

const REVIEW_PREVIEW_CHAR_LIMIT = 140;

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

export function TestimonialsCarouselClient() {
  const [reviewCarouselOffset, setReviewCarouselOffset] = useState(0);
  const [isReviewCarouselAnimating, setIsReviewCarouselAnimating] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});
  const reviewCarouselTrack = useMemo(
    () => [...testimonialCards, ...testimonialCards],
    [],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const interval = setInterval(() => {
      setReviewCarouselOffset((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const handleReviewTransitionEnd = () => {
    if (reviewCarouselOffset !== testimonialCards.length) return;

    setIsReviewCarouselAnimating(false);
    setReviewCarouselOffset(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsReviewCarouselAnimating(true);
      });
    });
  };

  return (
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
              transform: `translateX(-${reviewCarouselOffset * (100 / cardsPerView)}%)`,
            }}
            onTransitionEnd={handleReviewTransitionEnd}
          >
            {reviewCarouselTrack.map((review, idx) => (
              <div
                key={`${review.name}-${idx}`}
                className="shrink-0 px-3"
                style={{ flexBasis: `${100 / cardsPerView}%` }}
                aria-hidden={idx >= testimonialCards.length}
              >
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
                          [idx % testimonialCards.length]: !prev[idx % testimonialCards.length],
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
  );
}

