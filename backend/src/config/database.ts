import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * @param mongoUri - MongoDB connection string
 */
export const connectDatabase = async (mongoUri: string): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');

    // Handle connection events
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB database
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};
