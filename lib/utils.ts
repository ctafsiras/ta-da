import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const host = process.env.NODE_ENV === 'production' ? 'https://ta-da-bill.vercel.app' : 'http://localhost:3000';