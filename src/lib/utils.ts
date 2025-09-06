import type { GalleryWithAlt } from "@/types/Gallery";
import type { Truck } from "@/types/Truck";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return "€" + price.toFixed(2);
}

export function galleryModifier(camper: Truck) : GalleryWithAlt[] {
  console.log(camper);
  
  return camper.gallery.map((img, index) => ({
    ...img,
    alt: `${camper.name} ${index + 1}`
  }));
}