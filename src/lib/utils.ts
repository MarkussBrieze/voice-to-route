import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openGoogleMaps(address: string) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  window.open(url, '_blank');
}

export function openGoogleMapsRoute(addresses: string[]) {
  const url = `https://www.google.com/maps/dir/${addresses.map(addr => encodeURIComponent(addr)).join('/')}`;
  window.open(url, '_blank');
}
