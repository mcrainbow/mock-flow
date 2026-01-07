import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...classes: (string | boolean | undefined)[]) {
  return twMerge(clsx(classes));
}
