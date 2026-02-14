export interface GalleryImage {
  src: string;
  alt: string;
  category: 'kitchen' | 'bathroom' | 'basement' | 'outdoor';
}

export const galleryImages: GalleryImage[] = [
  // Basement Remodels
  {
    src: '/gallery/basement-pool-table-hero.webp',
    alt: 'Modern basement remodel with pool table, light gray walls, and open concept kitchen area',
    category: 'basement',
  },
  {
    src: '/gallery/basement-pool-table-entertainment.webp',
    alt: 'Luxury basement entertainment space featuring pool table and dark blue custom cabinets',
    category: 'basement',
  },
  {
    src: '/gallery/basement-wine-room.webp',
    alt: 'Custom wine room with glass enclosure, dark cabinetry, and elegant patterned wallpaper',
    category: 'basement',
  },
  {
    src: '/gallery/basement-gym-stairway.webp',
    alt: 'Basement home gym with white stairway featuring designer patterned tile and modern railings',
    category: 'basement',
  },
  
  // Kitchen Remodels
  {
    src: '/gallery/kitchen-white-wood-island.webp',
    alt: 'Bright white kitchen remodel with natural wood island, bar seating, and custom copper range hood',
    category: 'kitchen',
  },
  {
    src: '/gallery/kitchen-green-island.webp',
    alt: 'Designer kitchen featuring sage green island with white perimeter cabinets and patterned backsplash',
    category: 'kitchen',
  },
  {
    src: '/gallery/kitchen-white-galley.webp',
    alt: 'Elegant white galley kitchen with dark quartz countertops and rich hardwood flooring',
    category: 'kitchen',
  },
  {
    src: '/gallery/kitchen-dining-warm-tones.webp',
    alt: 'Open concept kitchen and dining area with warm wood tones and modern finishes',
    category: 'kitchen',
  },
  {
    src: '/gallery/kitchen-wooden-cabinets-detail.webp',
    alt: 'Modern kitchen detail shot featuring custom wooden upper cabinets, pendant lights, and built-in TV',
    category: 'kitchen',
  },
  
  // Bathroom Remodels
  {
    src: '/gallery/bathroom-freestanding-tub.webp',
    alt: 'Spa-inspired bathroom remodel with freestanding soaking tub, frameless glass shower, and black-framed windows',
    category: 'bathroom',
  },
  {
    src: '/gallery/bathroom-marble-vanity.webp',
    alt: 'Luxury bathroom with double vanity, marble accent wall, and matte black fixtures',
    category: 'bathroom',
  },
  {
    src: '/gallery/bathroom-blue-vanity.webp',
    alt: 'Contemporary bathroom featuring navy blue vanity with white countertops and gold hardware accents',
    category: 'bathroom',
  },
  {
    src: '/gallery/bathroom-white-modern.webp',
    alt: 'Clean modern bathroom remodel with white fixtures, premium tile work, and spa-like ambiance',
    category: 'bathroom',
  },
  
  // Outdoor/Whole-Home
  {
    src: '/gallery/whole-home-outdoor-patio.webp',
    alt: 'Modern outdoor living space with custom pergola and contemporary patio design',
    category: 'outdoor',
  },
  {
    src: '/gallery/home-addition-outdoor-deck.webp',
    alt: 'Luxury home addition featuring expansive outdoor deck with comfortable seating area',
    category: 'outdoor',
  },
];

// Featured images for "Browse Our Recent Transformations" section
export const featuredGalleryImages = [
  galleryImages[4], // kitchen-white-wood-island
  galleryImages[9], // bathroom-freestanding-tub
  galleryImages[0], // basement-pool-table-hero
  galleryImages[6], // kitchen-white-galley
  galleryImages[11], // bathroom-blue-vanity
  galleryImages[1], // basement-pool-table-entertainment
];
