import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper standar untuk menggabungkan className Tailwind.
// clsx merapikan kondisi (boolean/undefined), tailwind-merge menghilangkan
// konflik utility class (misal "px-2" ketimpa "px-4") supaya override style
// tetap bisa diprediksi ketika komponen dipakai berulang dengan props berbeda.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
