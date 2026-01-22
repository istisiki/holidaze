import type { Holiday } from '../types/holiday';

/**
 * Encode holidays to a URL-safe string
 * Format: 2026-01-01:New+Year,2026-12-25:Christmas
 */
export function encodeHolidays(holidays: Holiday[]): string {
  if (holidays.length === 0) return '';

  return holidays
    .map((h) => {
      const encodedDescription = encodeURIComponent(h.description).replace(
        /%20/g,
        '+'
      );
      return `${h.date}:${encodedDescription}`;
    })
    .join(',');
}

/**
 * Decode holidays from a URL-encoded string
 */
export function decodeHolidays(encoded: string): Holiday[] {
  if (!encoded) return [];

  try {
    return encoded.split(',').map((entry) => {
      const colonIndex = entry.indexOf(':');
      if (colonIndex === -1) {
        throw new Error(`Invalid holiday entry: ${entry}`);
      }

      const date = entry.substring(0, colonIndex);
      const encodedDescription = entry.substring(colonIndex + 1);
      const description = decodeURIComponent(encodedDescription.replace(/\+/g, ' '));

      return { date, description };
    });
  } catch (error) {
    console.error('Failed to decode holidays from URL:', error);
    return [];
  }
}

/**
 * Generate a full shareable URL with holidays encoded as query parameter
 */
export function generateShareUrl(holidays: Holiday[]): string {
  const encoded = encodeHolidays(holidays);
  const baseUrl = window.location.origin + window.location.pathname;

  if (!encoded) return baseUrl;

  return `${baseUrl}?holidays=${encoded}`;
}

/**
 * Get holidays from the current URL if present
 */
export function getHolidaysFromUrl(): Holiday[] {
  const params = new URLSearchParams(window.location.search);
  const holidaysParam = params.get('holidays');

  if (!holidaysParam) return [];

  return decodeHolidays(holidaysParam);
}

/**
 * Clear the holidays parameter from the URL without reloading
 */
export function clearUrlHolidays(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete('holidays');
  window.history.replaceState({}, '', url.toString());
}
