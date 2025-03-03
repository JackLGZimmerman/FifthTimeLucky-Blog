import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { redis } from '../../redis';
import crypto from 'crypto';
import type { RequestEvent } from '@sveltejs/kit';

export interface Session {
	id: string;
	userId: string;
	expiresAt: number;
	role: string;
}

export function generateSessionToken(): string {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	const token = encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase();
	return token;
}

export async function createSession(
	token: string,
	userId: string,
	role = 'GUEST'
): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; 

	const session: Session = {
		id: sessionId,
		userId,
		expiresAt,
		role,
	};

	// Store the session data in Redis
	await redis.set(
		`session:${session.id}`,
		JSON.stringify({
			id: session.id,
			user_id: session.userId,
			expires_at: session.expiresAt,
			role: session.role,
		}),
		{
			EX: session.expiresAt,
		}
	);

	if (role !== 'guest') {
		await redis.sAdd(`user:${session.userId}:sessions`, session.id);
		await redis.expire(`user:${session.userId}:sessions`, 60 * 60 * 24 * 45); // 45 days
	}

	return session;
}

export async function validateSessionToken(token: string): Promise<Session | null> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const item = await redis.get(`session:${sessionId}`);

	if (item === null) {
		return null;
	}

	const result = JSON.parse(item);
	const session: Session = {
		id: result.id,
		userId: result.user_id,
		expiresAt: result.expires_at,
		role: result.role,
	};

	const now = Math.floor(Date.now() / 1000);

	// Check if session has expired
	if (now >= session.expiresAt) {
		await redis.DEL(`session:${sessionId}`);
		return null;
	}

	// If session is more than 15 days old, extend it
	if (now >= session.expiresAt - 60 * 60 * 24 * 15) {
		session.expiresAt = now + 60 * 60 * 24 * 30; // Extend by 30 days
		await redis.set(
			`session:${session.id}`,
			JSON.stringify({
				id: session.id,
				user_id: session.userId,
				expires_at: session.expiresAt,
				role: session.role,
			}),
			{
				EX: session.expiresAt,
			}
		);
		await redis.sAdd(`user:${session.userId}:sessions`, session.id);
	}

	return session;
}

export async function invalidateSession(sessionId: string): Promise<void> {
	const sessionData = await redis.get(`session:${sessionId}`);
	if (sessionData) {
		const session = JSON.parse(sessionData);
		await Promise.all([
			redis.DEL(`session:${sessionId}`),
			redis.sRem(`user:${session.user_id}:sessions`, sessionId),
		]);
	}
}

export async function invalidateAllSessions(userId: number): Promise<void> {
	const sessionIds = await redis.sMembers(`user:${userId}:sessions`);
	if (sessionIds.length > 0) {
		await Promise.all([
			...sessionIds.map((sessionId) => redis.DEL(`session:${sessionId}`)),
			redis.DEL(`user:${userId}:sessions`),
		]);
	}
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: number): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		expires: new Date(expiresAt * 1000), // Convert seconds to milliseconds for Date
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		maxAge: 0,
	});
}
