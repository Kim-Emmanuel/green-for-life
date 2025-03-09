import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function smoothScroll(target: string | HTMLElement, offset: number = 100) {
  // Set up smooth scrolling behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  document.documentElement.style.scrollPaddingTop = `${offset}px`;

  const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!targetElement) return;

  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
