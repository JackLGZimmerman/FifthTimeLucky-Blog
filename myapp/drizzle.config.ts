import { defineConfig } from 'drizzle-kit';
if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',

	dbCredentials: {
		url: process.env.MONGODB_URI,
	},

	verbose: true,
	strict: true,
	dialect: 'mysql',
});
