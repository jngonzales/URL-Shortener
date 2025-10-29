import { Request, Response } from 'express';
import Url from '../models/Url';
import {
  generateShortCode,
  isValidUrl,
  sanitizeUrl,
  calculateExpirationDate,
} from '../utils/urlUtils';
import { asyncHandler } from '../middleware/errorHandler';

/**
 * @route   POST /api/shorten
 * @desc    Create a shortened URL
 * @access  Public
 */
export const shortenUrl = asyncHandler(async (req: Request, res: Response) => {
  const { url, customCode, expirationDays } = req.body;

  // Validate URL presence
  if (!url) {
    res.status(400).json({
      success: false,
      error: 'URL is required',
    });
    return;
  }

  // Sanitize the URL
  const sanitizedUrl = sanitizeUrl(url);

  // Validate URL format
  if (!isValidUrl(sanitizedUrl)) {
    res.status(400).json({
      success: false,
      error: 'Invalid URL format. Please provide a valid HTTP or HTTPS URL',
    });
    return;
  }

  try {
    // Check if URL already exists in database
    let existingUrl = await Url.findOne({ originalUrl: sanitizedUrl });

    if (existingUrl && !existingUrl.isExpired()) {
      // Return existing short URL
      res.status(200).json({
        success: true,
        data: {
          originalUrl: existingUrl.originalUrl,
          shortCode: existingUrl.shortCode,
          shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`,
          clicks: existingUrl.clicks,
          createdAt: existingUrl.createdAt,
          expiresAt: existingUrl.expiresAt,
        },
        message: 'URL already exists',
      });
      return;
    }

    // Generate or use custom short code
    let shortCode = customCode || generateShortCode();

    // If custom code provided, check if it's already in use
    if (customCode) {
      const codeExists = await Url.findOne({ shortCode: customCode });
      if (codeExists) {
        res.status(409).json({
          success: false,
          error: 'Custom code already in use. Please choose another',
        });
        return;
      }
    } else {
      // Ensure generated code is unique
      let isUnique = false;
      let attempts = 0;
      const maxAttempts = 10;

      while (!isUnique && attempts < maxAttempts) {
        const existingCode = await Url.findOne({ shortCode });
        if (!existingCode) {
          isUnique = true;
        } else {
          shortCode = generateShortCode();
          attempts++;
        }
      }

      if (!isUnique) {
        res.status(500).json({
          success: false,
          error: 'Failed to generate unique short code. Please try again',
        });
        return;
      }
    }

    // Calculate expiration date
    const expiresAt = calculateExpirationDate(
      expirationDays || parseInt(process.env.URL_EXPIRATION_DAYS || '0')
    );

    // Create new URL document
    const newUrl = await Url.create({
      originalUrl: sanitizedUrl,
      shortCode,
      expiresAt,
    });

    // Return success response
    res.status(201).json({
      success: true,
      data: {
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
        shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
        clicks: newUrl.clicks,
        createdAt: newUrl.createdAt,
        expiresAt: newUrl.expiresAt,
      },
      message: 'URL shortened successfully',
    });
  } catch (error) {
    console.error('Error in shortenUrl:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while creating short URL',
    });
  }
});

/**
 * @route   GET /:code
 * @desc    Redirect to original URL
 * @access  Public
 */
export const redirectUrl = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.params;

  if (!code) {
    res.status(400).json({
      success: false,
      error: 'Short code is required',
    });
    return;
  }

  try {
    // Find URL by short code
    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      res.status(404).json({
        success: false,
        error: 'URL not found',
      });
      return;
    }

    // Check if URL has expired
    if (url.isExpired()) {
      res.status(410).json({
        success: false,
        error: 'This URL has expired',
      });
      return;
    }

    // Increment click count
    url.clicks += 1;
    await url.save();

    // Redirect to original URL
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Error in redirectUrl:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while redirecting',
    });
  }
});

/**
 * @route   GET /api/analytics/:code
 * @desc    Get analytics for a shortened URL
 * @access  Public
 */
export const getAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.params;

  if (!code) {
    res.status(400).json({
      success: false,
      error: 'Short code is required',
    });
    return;
  }

  try {
    // Find URL by short code
    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      res.status(404).json({
        success: false,
        error: 'URL not found',
      });
      return;
    }

    // Return analytics data
    res.status(200).json({
      success: true,
      data: {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
        clicks: url.clicks,
        createdAt: url.createdAt,
        expiresAt: url.expiresAt,
        isExpired: url.isExpired(),
      },
    });
  } catch (error) {
    console.error('Error in getAnalytics:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching analytics',
    });
  }
});
