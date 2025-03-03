import { createClient } from 'redis';

// By default, this connects to localhost:6379
// If you have a specific URL, you can use it: process.env.REDIS_URL or something like redis://:password@host:port
const client = createClient({
	url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => {
	console.error('Redis Client Error', err);
});

// Initiate the connection
await client.connect();

// Export the client as `redis`
export { client as redis };
