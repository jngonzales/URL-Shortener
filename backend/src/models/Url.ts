import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface representing a URL document in MongoDB
 */
export interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
  expiresAt?: Date;
  isExpired(): boolean;
}

/**
 * Mongoose schema for URL documents
 */
const UrlSchema = new Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: [true, 'Original URL is required'],
      trim: true,
    },
    shortCode: {
      type: String,
      required: [true, 'Short code is required'],
      unique: true,
      trim: true,
      index: true,
    },
    clicks: {
      type: Number,
      default: 0,
      min: 0,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

/**
 * Method to check if URL has expired
 */
UrlSchema.methods.isExpired = function (): boolean {
  if (!this.expiresAt) {
    return false;
  }
  return new Date() > this.expiresAt;
};

/**
 * Index for efficient querying by shortCode
 */
UrlSchema.index({ shortCode: 1 });

/**
 * Index for cleaning up expired URLs
 */
UrlSchema.index({ expiresAt: 1 }, { sparse: true });

export default mongoose.model<IUrl>('Url', UrlSchema);
