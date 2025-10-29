/**
 * Type definitions for URL Shortener API
 */

export interface ShortenUrlRequest {
  url: string;
  customCode?: string;
  expirationDays?: number;
}

export interface UrlData {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  expiresAt?: string;
  isExpired?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AnalyticsData extends UrlData {
  isExpired: boolean;
}
