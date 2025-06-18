import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const debug = (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.debug('DEBUG:', ...args);
    }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
