import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a relative string for display on a blog post.
 * This function takes a Date object and returns a string describing the
 * relative time between the given date and the current time.
 *
 * The returned string is in one of the following formats:
 * - "now" if the given date is within the last minute.
 * - "X minutes" if the given date is within the last hour.
 * - "X hours" if the given date is within the last day.
 * - "X days" if the given date is within the last week.
 * - "X weeks" if the given date is within the last month.
 * - "X months" if the given date is within the last year.
 * - "DD MMM YYYY" if the given date is more than a year ago.
 */
export const formatBlogDate = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return minutes === 1 ? "1 minute" : `${minutes} minutes`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return hours === 1 ? "1 hour" : `${hours} hours`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return days === 1 ? "1 day" : `${days} days`;
  } else if (diffInSeconds < 2419200) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return weeks === 1 ? "1 week" : `${weeks} weeks`;
  } else if (diffInSeconds < 29030400) {
    const months = Math.floor(diffInSeconds / 2419200);
    return months === 1 ? "1 month" : `${months} months`;
  } else {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
};
