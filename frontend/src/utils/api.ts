import axios, { AxiosError } from 'axios';
import { ShortenUrlRequest, ApiResponse, UrlData, AnalyticsData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Shorten a URL
 */
export const shortenUrl = async (
  request: ShortenUrlRequest
): Promise<ApiResponse<UrlData>> => {
  try {
    const response = await api.post<ApiResponse<UrlData>>('/api/shorten', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<UrlData>>;
      return {
        success: false,
        error: axiosError.response?.data?.error || 'Failed to shorten URL',
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
};

/**
 * Get analytics for a short URL
 */
export const getAnalytics = async (
  shortCode: string
): Promise<ApiResponse<AnalyticsData>> => {
  try {
    const response = await api.get<ApiResponse<AnalyticsData>>(
      `/api/analytics/${shortCode}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<AnalyticsData>>;
      return {
        success: false,
        error: axiosError.response?.data?.error || 'Failed to fetch analytics',
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
};

/**
 * Check server health
 */
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.status === 200;
  } catch {
    return false;
  }
};
