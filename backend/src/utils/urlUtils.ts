import { customAlphabet } from 'nanoid';
import validator from 'validator';

/**
 * Generate a unique short code for URLs
 * Uses nanoid with custom alphabet (alphanumeric only)
 * @param length - Length of the short code (default: 6)
 * @returns Unique short code
 */
export const generateShortCode = (length: number = 6): string => {
  // Custom alphabet: alphanumeric characters only (no special chars for cleaner URLs)
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
};

/**
 * Validate if a string is a valid URL
 * @param url - URL string to validate
 * @returns true if valid URL, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
    allow_underscores: true,
  });
};

/**
 * Calculate expiration date based on days from now
 * @param days - Number of days until expiration (0 = no expiration)
 * @returns Date object or undefined
 */
export const calculateExpirationDate = (days: number): Date | undefined => {
  if (days <= 0) {
    return undefined;
  }
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  return expirationDate;
};

/**
 * Sanitize URL by trimming whitespace and removing trailing slashes
 * @param url - URL string to sanitize
 * @returns Sanitized URL
 */
export const sanitizeUrl = (url: string): string => {
  return url.trim().replace(/\/+$/, '');
};
