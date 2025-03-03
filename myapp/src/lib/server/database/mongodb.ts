import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectToDatabase(): Promise<typeof mongoose> {
	try {
		if (connectionPromise === null) {
			// If there's no existing promise, create a new connection
			console.log('Creating new MongoDB connection...');

			if (!MONGODB_URI) {
				throw new Error('MONGODB_URI environment variable is not defined');
			}

			// Configure mongoose
			mongoose.set('strictQuery', true);

			connectionPromise = mongoose.connect(MONGODB_URI, {
				// Removed deprecated options
			});

			// Add connection event listeners for debugging
			mongoose.connection.on('connected', () => {
				console.log('MongoDB connection established');
			});

			mongoose.connection.on('error', (err) => {
				console.error('MongoDB connection error:', err);
				connectionPromise = null; // Reset on error
			});

			mongoose.connection.on('disconnected', () => {
				console.log('MongoDB disconnected');
				connectionPromise = null; // Reset on disconnect
			});
		}

		return await connectionPromise;
	} catch (error) {
		console.error('Failed to connect to MongoDB:', error);
		connectionPromise = null;
		throw error;
	}
}

// Add a shutdown handler
process.on('SIGINT', async () => {
	try {
		await mongoose.connection.close();
		console.log('MongoDB connection closed through app termination');
		process.exit(0);
	} catch (err) {
		console.error('Error during MongoDB connection closure:', err);
		process.exit(1);
	}
});
