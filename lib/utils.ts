import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow, format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeAgo = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatDate = (date: Date): string => {
  return format(date, 'dd MMM yyyy');
};