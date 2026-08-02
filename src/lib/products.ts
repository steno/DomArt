import type { ColorwayId } from "./colorways";

export type ProductType =
  | "living-room"
  | "bedroom-headboard"
  | "dining-room"
  | "bathroom";

export type WallWidth = "narrow" | "standard" | "wide" | "extra-wide";
export type BaseBandHeight = "none" | "low" | "standard";

export interface Product {
  id: ProductType;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  basePriceCents: number;
  features: string[];
  specs: {
    materials: string;
    finish: string;
    modularWidths: string;
    depth: string;
    diyOption: string;
  };
  cutList: string[];
  defaultOptions: {
    tvRecess: boolean;
    lattice: boolean;
    baseBand: BaseBandHeight;
    width: WallWidth;
  };
}

export const WALL_WIDTHS: {
  id: WallWidth;
  label: string;
  inches: string;
  priceModifierCents: number;
}[] = [
  { id: "narrow", label: "Narrow", inches: '72"', priceModifierCents: 0 },
  { id: "standard", label: "Standard", inches: '96"', priceModifierCents: 12000 },
  { id: "wide", label: "Wide", inches: '120"', priceModifierCents: 24000 },
  { id: "extra-wide", label: "Extra Wide", inches: '144"', priceModifierCents: 36000 },
];

export const BASE_BANDS: {
  id: BaseBandHeight;
  label: string;
  priceModifierCents: number;
}[] = [
  { id: "none", label: "None", priceModifierCents: 0 },
  { id: "low", label: "Low (6\")", priceModifierCents: 5000 },
  { id: "standard", label: "Standard (10\")", priceModifierCents: 8000 },
];

export const products: Product[] = [
  {
    id: "living-room",
    slug: "living-room",
    name: "Living Room Accent Wall",
    shortName: "Living Room",
    tagline: "A joyful focal wall with optional TV integration.",
    description:
      "Modular facade panels that frame your living room with Dominican vernacular rhythm—louvered shutters, light pine, and a single accent color. Designed for calm modern interiors with optional TV recess.",
    basePriceCents: 168000,
    features: [
      "Optional TV recess for screens up to 75\"",
      "Central faux louvered shutters",
      "Flanking vertical shutter panels",
      "Thin painted frame in accent color",
    ],
    specs: {
      materials: "Light natural pine planks, unfinished or lightly oiled",
      finish: "Painted shutters, frame & trim in your accent color + white",
      modularWidths: '72", 96", 120", 144"',
      depth: '3.5" overall profile',
      diyOption: "Kit with cut list & finish guide, or fully finished panels",
    },
    cutList: [
      "Horizontal clapboard face boards (pine)",
      "Central shutter assembly with louvers",
      "Left & right vertical shutter panels",
      "Accent frame rails & stiles",
      "Optional zócalo base band",
      "Optional celosía lattice strip",
      "Optional TV recess frame",
    ],
    defaultOptions: {
      tvRecess: true,
      lattice: false,
      baseBand: "low",
      width: "standard",
    },
  },
  {
    id: "bedroom-headboard",
    slug: "bedroom-headboard",
    name: "Bedroom Headboard Wall",
    shortName: "Bedroom",
    tagline: "A serene headboard wall that softens the room.",
    description:
      "The Fachada Series scaled for the bedroom—centered shutters above the bed, flanking panels, and the same three-color Dominican language. Calm enough for rest, distinctive enough to feel like home.",
    basePriceCents: 138000,
    features: [
      "Proportioned for queen & king beds",
      "Central shutter window motif",
      "Soft vertical flanking panels",
      "Optional lattice for airy detail",
    ],
    specs: {
      materials: "Light natural pine planks, unfinished or lightly oiled",
      finish: "Painted shutters, frame & trim in your accent color + white",
      modularWidths: '72", 96", 120", 144"',
      depth: '3" overall profile',
      diyOption: "Kit with cut list & finish guide, or fully finished panels",
    },
    cutList: [
      "Horizontal clapboard face boards (pine)",
      "Central shutter assembly",
      "Left & right vertical panels",
      "Accent frame",
      "Optional zócalo base band",
      "Optional celosía lattice strip",
    ],
    defaultOptions: {
      tvRecess: false,
      lattice: true,
      baseBand: "none",
      width: "standard",
    },
  },
  {
    id: "dining-room",
    slug: "dining-room",
    name: "Dining Room Accent Wall",
    shortName: "Dining Room",
    tagline: "Caribbean spirit behind the table.",
    description:
      "Bring the casa de madera facade into the dining room—modular pine panels, painted shutters, and white trim that glow under evening light. Same structure as the series; only the colorway changes.",
    basePriceCents: 158000,
    features: [
      "Centered composition behind dining table",
      "Signature louvered shutters",
      "Optional zócalo for grounded presence",
      "Works with existing wainscoting",
    ],
    specs: {
      materials: "Light natural pine planks, unfinished or lightly oiled",
      finish: "Painted shutters, frame & trim in your accent color + white",
      modularWidths: '72", 96", 120", 144"',
      depth: '3.5" overall profile',
      diyOption: "Kit with cut list & finish guide, or fully finished panels",
    },
    cutList: [
      "Horizontal clapboard face boards (pine)",
      "Central shutter assembly with louvers",
      "Left & right vertical shutter panels",
      "Accent frame rails & stiles",
      "Optional zócalo base band",
      "Optional celosía lattice strip",
    ],
    defaultOptions: {
      tvRecess: false,
      lattice: false,
      baseBand: "standard",
      width: "wide",
    },
  },
  {
    id: "bathroom",
    slug: "bathroom",
    name: "Bathroom Vanity Backboard",
    shortName: "Bathroom",
    tagline: "A medicine-cabinet facade above the sink.",
    description:
      "The Fachada Series scaled for the bath—modular pine panels behind the vanity, with the signature shutter window reading as a medicine-cabinet optic. Accent color on shutters and zócalo; light wood and white trim throughout.",
    basePriceCents: 118000,
    features: [
      "Centered medicine-cabinet shutter motif",
      "Proportioned for vanity widths",
      "Moisture-minded finishes available",
      "Full shutter, frame & zócalo language",
    ],
    specs: {
      materials: "Light natural pine planks, unfinished or lightly oiled",
      finish: "Painted shutters, frame & trim in your accent color + white",
      modularWidths: '72", 96", 120", 144"',
      depth: '2.75" overall profile',
      diyOption: "Kit with cut list & finish guide, or fully finished panels",
    },
    cutList: [
      "Horizontal clapboard face boards (pine)",
      "Central shutter / medicine-cabinet assembly",
      "Left & right vertical panels",
      "Accent frame",
      "Optional zócalo base band",
      "Optional celosía lattice strip",
    ],
    defaultOptions: {
      tvRecess: false,
      lattice: false,
      baseBand: "low",
      width: "narrow",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug || p.id === slug);
}

export interface Configuration {
  productId: ProductType;
  colorwayId: ColorwayId;
  tvRecess: boolean;
  lattice: boolean;
  baseBand: BaseBandHeight;
  width: WallWidth;
}

export function calculatePrice(config: Configuration): number {
  const product = getProduct(config.productId);
  if (!product) return 0;

  let total = product.basePriceCents;
  const width = WALL_WIDTHS.find((w) => w.id === config.width);
  const band = BASE_BANDS.find((b) => b.id === config.baseBand);

  total += width?.priceModifierCents ?? 0;
  total += band?.priceModifierCents ?? 0;
  if (config.tvRecess) total += 14000;
  if (config.lattice) total += 9000;

  return total;
}

export function configLabel(config: Configuration): string {
  const product = getProduct(config.productId);
  return product?.name ?? config.productId;
}

export const PRODUCTION_WEEKS = "3–4 weeks";
