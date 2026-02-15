"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryImages, featuredGalleryImages } from "@/lib/gallery-data";

export function GallerySectionClient() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxImages = useMemo(() => galleryImages, []);

  return (
    <>
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

