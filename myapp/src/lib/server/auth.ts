import { error } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

// This is a simplified mock database - replace with your actual database
const users = new Map<string, User>();

export interface User {
	id: string;
	username: string;
	email: string;
	passwordHash: string;
}

// User authentication functions only - no session management
export async function createUser(username: string, email: string, password: string): Promise<User> {
	// Check if username already exists
	if (users.has(username.toLowerCase())) {
		throw error(400, 'Username already exists');
	}

	// Check if email is already used
	const emailExists = Array.from(users.values()).some(
		(user) => user.email.toLowerCase() === email.toLowerCase()
	);
	if (emailExists) {
		throw error(400, 'Email already in use');
	}

	// Hash password
	const passwordHash = await bcrypt.hash(password, 10);

	// Create user
	const userId = crypto.randomUUID();
	const user: User = {
		id: userId,
		username,
		email,
		passwordHash,
	};

	// Save user
	users.set(username.toLowerCase(), user);

	return user;
}

export async function authenticateUser(username: string, password: string): Promise<User> {
	const user = users.get(username.toLowerCase());
	if (!user) {
		throw error(401, 'Invalid username or password');
	}

	const passwordMatch = await bcrypt.compare(password, user.passwordHash);
	if (!passwordMatch) {
		throw error(401, 'Invalid username or password');
	}

	return user;
}

export function getUserById(userId: string): User | undefined {
	return Array.from(users.values()).find((user) => user.id === userId);
}
