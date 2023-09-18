import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const dateFormatter = (date: string | undefined) => {
  if (typeof date === 'undefined') return date;
  const rtf = new Intl.RelativeTimeFormat('en', {
    localeMatcher: 'best fit',
    numeric: 'auto',
    style: 'long',
  });
  const calc = (Date.parse(date) - Date.now()) / (1000 * 60 * 60 * 24);
  const diff = Math.floor(calc);
  return diff >= -1 && diff < 0
    ? rtf.format(0, 'day')
    : rtf.format(diff, 'days');
};
