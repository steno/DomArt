import type { ColorwayId } from "./colorways";
import type { ProductType } from "./products";

/** Web-optimized colorway panel crops from the DIY styles sheet */
export const colorwayImages: Record<ColorwayId, string> = {
  costa: "/images/colorways/costa.webp",
  sol: "/images/colorways/sol.webp",
  jungla: "/images/colorways/jungla.webp",
  coral: "/images/colorways/coral.webp",
  "soft-pink": "/images/colorways/soft-pink.webp",
  navy: "/images/colorways/navy.webp",
};

export const STYLES_SHEET = "/images/colorways/styles-sheet.webp";

/**
 * Same-scene lifestyle heroes per product — composition stays fixed;
 * only accent color changes across the six colorways.
 * Living + bedroom use the new data/raw swap set where available.
 */
export const categoryScenes: Record<
  ProductType,
  Record<ColorwayId, string>
> = {
  "living-room": {
    costa: "/images/lifestyle/living-room-costa.webp",
    sol: "/images/lifestyle/living-room-sol.webp",
    jungla: "/images/lifestyle/living-room-jungla.webp",
    coral: "/images/lifestyle/living-room-coral.webp",
    "soft-pink": "/images/lifestyle/living-room-soft-pink.webp",
    navy: "/images/lifestyle/living-room-navy.webp",
  },
  "bedroom-headboard": {
    costa: "/images/lifestyle/bedroom-costa.webp",
    sol: "/images/lifestyle/bedroom-sol.webp",
    jungla: "/images/lifestyle/bedroom-jungla.webp",
    coral: "/images/lifestyle/bedroom-coral.webp",
    "soft-pink": "/images/lifestyle/bedroom-soft-pink.webp",
    navy: "/images/lifestyle/bedroom-navy.webp",
  },
  "dining-room": {
    costa: "/images/lifestyle/dining-costa.webp",
    sol: "/images/lifestyle/dining-sol.webp",
    jungla: "/images/lifestyle/dining-jungla.webp",
    coral: "/images/lifestyle/dining-coral.webp",
    "soft-pink": "/images/lifestyle/dining-soft-pink.webp",
    navy: "/images/lifestyle/dining-navy.webp",
  },
  bathroom: {
    costa: "/images/lifestyle/bathroom-costa.webp",
    sol: "/images/lifestyle/bathroom-sol.webp",
    jungla: "/images/lifestyle/bathroom-jungla.webp",
    coral: "/images/lifestyle/bathroom-coral.webp",
    "soft-pink": "/images/lifestyle/bathroom-soft-pink.webp",
    navy: "/images/lifestyle/bathroom-navy.webp",
  },
};

/** Photo thumbs for the color picker (image-swap) — all six colorways per product. */
export const colorSwatchImages: Record<
  ProductType,
  Record<ColorwayId, string>
> = {
  "living-room": {
    costa: "/images/swatches/living-room-costa.webp",
    sol: "/images/swatches/living-room-sol.webp",
    jungla: "/images/swatches/living-room-jungla.webp",
    coral: "/images/swatches/living-room-coral.webp",
    "soft-pink": "/images/swatches/living-room-soft-pink.webp",
    navy: "/images/swatches/living-room-navy.webp",
  },
  "bedroom-headboard": {
    costa: "/images/swatches/bedroom-costa.webp",
    sol: "/images/swatches/bedroom-sol.webp",
    jungla: "/images/swatches/bedroom-jungla.webp",
    coral: "/images/swatches/bedroom-coral.webp",
    "soft-pink": "/images/swatches/bedroom-soft-pink.webp",
    navy: "/images/swatches/bedroom-navy.webp",
  },
  "dining-room": {
    costa: "/images/swatches/dining-costa.webp",
    sol: "/images/swatches/dining-sol.webp",
    jungla: "/images/swatches/dining-jungla.webp",
    coral: "/images/swatches/dining-coral.webp",
    "soft-pink": "/images/swatches/dining-soft-pink.webp",
    navy: "/images/swatches/dining-navy.webp",
  },
  bathroom: {
    costa: "/images/swatches/bathroom-costa.webp",
    sol: "/images/swatches/bathroom-sol.webp",
    jungla: "/images/swatches/bathroom-jungla.webp",
    coral: "/images/swatches/bathroom-coral.webp",
    "soft-pink": "/images/swatches/bathroom-soft-pink.webp",
    navy: "/images/swatches/bathroom-navy.webp",
  },
};

export function swatchForProduct(
  productId: ProductType,
  colorwayId: ColorwayId
): string {
  return colorSwatchImages[productId][colorwayId];
}

/** All lifestyle photography (used on home, inspiration, PDP) */
export const lifestyleImages = {
  hero: "/images/lifestyle/living-costa-tv.webp",
  livingCosta: "/images/lifestyle/living-costa.webp",
  livingCostaTv: "/images/lifestyle/living-costa-tv.webp",
  livingCostaLattice: "/images/lifestyle/living-costa-lattice.webp",
  livingSol: "/images/lifestyle/living-sol.webp",
  livingJungla: "/images/lifestyle/living-jungla.webp",
  livingCoral: "/images/lifestyle/living-coral.webp",
  livingCoralTv: "/images/lifestyle/living-coral-tv.webp",
  livingMixed: "/images/lifestyle/lifestyle-01.webp",
  bedroomJungla: "/images/lifestyle/bedroom-jungla.webp",
  diningSol: "/images/lifestyle/dining-sol.webp",
  bathroomCosta: "/images/lifestyle/bathroom-costa.webp",
  facadeLime: "/images/lifestyle/facade-lime.webp",
  facadeMarigold: "/images/lifestyle/facade-marigold.webp",
  facadeLavender: "/images/lifestyle/facade-lavender.webp",
  facadeCostaTwin: "/images/lifestyle/facade-costa-twin.webp",
  facadeCostaWindow: "/images/lifestyle/facade-costa-window.webp",
} as const;

/** Default lifestyle hero per product type (native colorway scene) */
export const productLifestyleHero: Record<ProductType, string> = {
  "living-room": categoryScenes["living-room"].coral,
  "bedroom-headboard": categoryScenes["bedroom-headboard"].jungla,
  "dining-room": categoryScenes["dining-room"].sol,
  bathroom: categoryScenes.bathroom.costa,
};

/** Same room scene for every colorway — only the accent paint changes */
export function lifestyleForColorway(id: ColorwayId): string {
  return categoryScenes["living-room"][id];
}

export function lifestyleForProduct(
  productId: ProductType,
  colorwayId: ColorwayId
): string {
  return categoryScenes[productId][colorwayId];
}

export const inspirationGallery: {
  src: string;
  title: string;
  caption: string;
  href: string;
}[] = [
  {
    src: lifestyleImages.facadeCostaTwin,
    title: "Costa twin windows",
    caption: "White louvers on bright blue siding.",
    href: "/shop/",
  },
  {
    src: lifestyleImages.facadeLime,
    title: "Lime jalousie",
    caption: "White louvers on a Caribbean green facade.",
    href: "/shop/",
  },
  {
    src: lifestyleImages.facadeMarigold,
    title: "Marigold shutters",
    caption: "Blue frame, white louvers, sun-warmed siding.",
    href: "/shop/",
  },
  {
    src: lifestyleImages.facadeLavender,
    title: "Lavender & yellow",
    caption: "Weathered color blocking—shutters as architecture.",
    href: "/shop/",
  },
  {
    src: lifestyleImages.livingMixed,
    title: "Casa Alegre mix",
    caption: "Playful Caribbean color blocking.",
    href: "/shop/",
  },
  {
    src: lifestyleImages.livingCoral,
    title: "Coral living",
    caption: "Weathered green flanks, coral frame.",
    href: "/product/living-room/?color=coral",
  },
];
