export interface GalleryImage {
  src: string;
  alt: string;
  category: 'kitchen' | 'bathroom' | 'basement' | 'outdoor';
}

export const galleryImages: GalleryImage[] = [
  { src: '/gallery/basement-pool-table-hero.webp', alt: 'Finished basement with pool table and open entertainment area', category: 'basement' },
  { src: '/gallery/blue-basement.webp', alt: 'Basement remodel with blue cabinetry and entertainment layout', category: 'basement' },
  { src: '/gallery/kitchen-white-wood-island.webp', alt: 'White kitchen with wood island and bar seating', category: 'kitchen' },
  { src: '/gallery/kitchen-white-green.webp', alt: 'Kitchen remodel with white cabinetry and green island', category: 'kitchen' },
  { src: '/gallery/kitchen-brown-island.webp', alt: 'Kitchen remodel featuring a warm brown island and bright finishes', category: 'kitchen' },
  { src: '/gallery/kitchen-wooden-cabinets-detail.webp', alt: 'Kitchen detail with wooden cabinets and modern lighting', category: 'kitchen' },
  { src: '/gallery/bathroom-white-modern.webp', alt: 'Modern white bathroom remodel with clean lines', category: 'bathroom' },
  { src: '/gallery/bathroom-blue-vanity.webp', alt: 'Bathroom remodel with blue vanity and white counters', category: 'bathroom' },
  { src: '/gallery/bathroom-shower-tub.webp', alt: 'Bathroom with glass shower and freestanding tub', category: 'bathroom' },
  { src: '/gallery/whole-home-outdoor-patio.webp', alt: 'Whole-home project with modern outdoor patio', category: 'outdoor' },
  { src: '/gallery/home-addition-outdoor-deck.webp', alt: 'Home addition with outdoor deck and seating area', category: 'outdoor' },
  { src: '/gallery/outdoor-seating.webp', alt: 'Outdoor living space with covered seating area', category: 'outdoor' },
];

// Featured images for "Browse Our Recent Transformations" section.
// Keep this tied to current gallery ordering so UI updates automatically.
export const featuredGalleryImages = galleryImages.slice(0, 6);
