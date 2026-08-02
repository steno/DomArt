export type ColorwayId =
  | "costa"
  | "sol"
  | "jungla"
  | "coral"
  | "soft-pink"
  | "navy";

export interface Colorway {
  id: ColorwayId;
  name: string;
  accent: string;
  accentMuted: string;
  description: string;
}

export const WOOD = {
  light: "#E8D5B5",
  mid: "#D4BC94",
  grain: "#C4A878",
  shadow: "#B8956A",
  deep: "#A6855C",
} as const;

export const WHITE = "#F7F4EF";
export const WHITE_TRIM = "#FFFEFB";

export const colorways: Colorway[] = [
  {
    id: "costa",
    name: "Costa",
    accent: "#2A9D8F",
    accentMuted: "#4DB6A9",
    description: "Turquoise inspired by Caribbean coastal waters.",
  },
  {
    id: "sol",
    name: "Sol",
    accent: "#E9C46A",
    accentMuted: "#F0D48A",
    description: "Sunny yellow that catches warm afternoon light.",
  },
  {
    id: "jungla",
    name: "Jungla",
    accent: "#7CB98A",
    accentMuted: "#97C9A3",
    description: "Mint green drawn from tropical garden shade.",
  },
  {
    id: "coral",
    name: "Coral",
    accent: "#E07A5F",
    accentMuted: "#E99882",
    description: "Coral warmth from Puerto Plata sunsets.",
  },
  {
    id: "soft-pink",
    name: "Soft Pink",
    accent: "#D4A5A5",
    accentMuted: "#E0BCBC",
    description: "Soft pink for serene, luminous interiors.",
  },
  {
    id: "navy",
    name: "Navy",
    accent: "#264653",
    accentMuted: "#3D5F6E",
    description: "Deep navy for sophisticated evening calm.",
  },
];

export function getColorway(id: ColorwayId): Colorway {
  return colorways.find((c) => c.id === id) ?? colorways[0];
}
