import { Request, Response, NextFunction } from "express";

/**
 * Interface for API Error with status code
 */
export interface ApiError extends Error {
  statusCode?: number;
}

/**
 * Global error handling middleware
 * Catches all errors and sends appropriate response
 */
export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log error for debugging
  console.error("Error:", err);

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Determine error message
  const message = err.message || "Internal Server Error";

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * Middleware to handle 404 - Not Found
 */
export const notFound = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const error: ApiError = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
