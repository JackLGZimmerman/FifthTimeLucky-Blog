import { connectToDatabase } from '$lib/server/database/mongodb';
import User, { UserRole } from '$lib/server/models/users';
import UserAuth from '$lib/server/models/userAuth';
import UserProfile from '$lib/server/models/userProfile';
import {
	generateSessionToken,
	createSession,
	setSessionTokenCookie,
	invalidateSession,
	deleteSessionTokenCookie,
} from '$lib/server/handler/session/session';
import type { RequestEvent } from '@sveltejs/kit';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define return types for better type safety
type AuthFailure = {
	success: false;
	message: string;
};

type AuthSuccess = {
	success: true;
	message: string;
	user: {
		id: mongoose.Types.ObjectId;
		username: string;
		email: string;
		role: string;
	};
};

export type AuthResult = AuthSuccess | AuthFailure;

/**
 * Check if a username or email is already registered
 * Returns detailed information about existing users
 */
export async function checkExistingUser(username: string, email: string) {
	await connectToDatabase();

	// Use a single optimized query
	const existingUser = await User.findOne({
		$or: [{ username }, { email }],
	});

	if (existingUser) {
		const field = existingUser.username === username ? 'username' : 'email';
		return {
			exists: true,
			field,
			message: `This ${field} is already registered`,
		};
	}

	return { exists: false };
}

/**
 * Create a new user with associated auth and profile records
 */
export async function createNewUser(username: string, email: string, password: string) {
	try {
		await connectToDatabase();

		// Use the existing function for checking duplicates
		const existingCheck = await checkExistingUser(username, email);
		if (existingCheck.exists) {
			throw new Error(existingCheck.message);
		}

		// Create the main user document
		const newUser = new User({
			username,
			email,
			role: UserRole.USER,
			emailVerified: false,
		});

		await newUser.save();

		// Hash the password for UserAuth
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the UserAuth document
		const userAuth = new UserAuth({
			userId: newUser._id,
			password: hashedPassword,
			failedLoginAttempts: 0,
		});

		await userAuth.save();

		// Create the UserProfile document with defaults
		const userProfile = new UserProfile({
			userId: newUser._id,
			preferences: {
				theme: 'light',
				language: 'en',
			},
		});

		await userProfile.save();

		return newUser;
	} catch (error) {
		if (error instanceof Error) {
			throw error; // Re-throw validation errors
		}
		throw new Error('Failed to create user');
	}
}

/**
 * Authenticate a user and create a session
 */
export async function authenticateUser(
	event: RequestEvent,
	usernameOrEmail: string,
	password: string
): Promise<AuthResult> {
	await connectToDatabase();

	// Find the user with a single optimized query (consistent with checkExistingUser)
	const user = await User.findOne({
		$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
	});

	if (!user) {
		return { success: false, message: 'Invalid credentials' };
	}

	// Get auth info
	const userAuth = await UserAuth.findOne({ userId: user._id });

	if (!userAuth) {
		return { success: false, message: 'Authentication data not found' };
	}

	// Compare passwords
	const isValid = await bcrypt.compare(password, userAuth.password);
	if (!isValid) {
		// Increment failed login attempts
		userAuth.failedLoginAttempts += 1;
		await userAuth.save();
		return { success: false, message: 'Invalid credentials' };
	}

	// Reset failed attempts and update last login
	userAuth.failedLoginAttempts = 0;
	userAuth.lastLoginAt = new Date();
	await userAuth.save();

	// Create session
	const token = generateSessionToken();
	const session = await createSession(token, user._id.toString(), user.role);

	// Set session cookie
	setSessionTokenCookie(event, token, session.expiresAt);

	return {
		success: true,
		message: 'Authentication successful',
		user: {
			id: user._id,
			username: user.username,
			email: user.email,
			role: user.role,
		},
	};
}

/**
 * Log out a user by invalidating their session
 */
export async function logoutUser(event: RequestEvent) {
	if (event.locals.session) {
		await invalidateSession(event.locals.session.id);
	}

	deleteSessionTokenCookie(event);

	return {
		success: true,
		message: 'Signed out successfully',
	};
}
