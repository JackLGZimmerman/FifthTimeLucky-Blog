import type { Handle, RequestEvent, ResolveOptions } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import {
	generateSessionToken,
	createSession,
	getSessionCookieSettings,
	setSessionTokenCookie,
	deleteSessionTokenCookie,
	validateSessionToken,
	invalidateSession,
	type Session,
} from './session';
import type { AuthResult } from '$lib/server/utils/authorisation';

// Define safe response types
type SafeResponse = {
	success: boolean;
	message: string;
};

// Use the standard SvelteKit Resolve type pattern
type Resolve = (event: RequestEvent, opts?: ResolveOptions) => Promise<Response> | Response;

/**
 * Generate a unique ID for guest users
 */
function generateGuestId(): string {
	return `guest-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Check if response is JSON
 */
function isJsonResponse(response: Response): boolean {
	return response.headers.get('content-type')?.includes('application/json') || false;
}

/**
 * Check if response indicates successful signin
 */
function isAuthSuccess(data: AuthResult): boolean {
	return data.success === true && 'user' in data && data.user.id !== undefined;
}

/**
 * Check if request is a signout
 */
function isSignoutRequest(event: RequestEvent, data: AuthResult): boolean {
	return event.url.pathname === '/api/auth/signout' && data.success;
}

/**
 * Handle successful authentication (signin/signup)
 */
async function handleAuthSuccess(event: RequestEvent, data: AuthResult): Promise<Response> {
	// For failed authentication, just return the error message
	if (!data.success) {
		return json({
			success: false,
			message: data.message,
		});
	}

	const userId = String(data.user.id);
	const userRole = data.user.role || 'user';

	const existingToken = event.cookies.get('session');

	// Check for valid existing session for this user
	if (existingToken) {
		const session = await validateSessionToken(existingToken);
		if (session && session.userId === userId) {
			// Update locals with session data
			event.locals.session = session;
			event.locals.user = userId;

			// Return only success and message
			return json({
				success: true,
				message: data.message || 'Authentication successful',
			});
		}

		if (session) {
			await invalidateSession(session.id);
		}
	}

	// Create new session
	const newToken = generateSessionToken();
	const session = await createSession(newToken, userId, userRole);

	// Store session data in locals for use in routes
	event.locals.session = session;
	event.locals.user = userId;

	// Return minimal response (no user data) with session cookie
	const safeResponse: SafeResponse = {
		success: true,
		message: data.message || 'Authentication successful',
	};

	const newResponse = json(safeResponse);
	newResponse.headers.append('Set-Cookie', getSessionCookieSettings(newToken, session.expiresAt));
	return newResponse;
}

/**
 * Handle signout requests
 */
async function handleSignoutRequest(event: RequestEvent, data: AuthResult): Promise<Response> {
	const token = event.cookies.get('session');

	if (token) {
		const session = await validateSessionToken(token);
		if (session) {
			await invalidateSession(session.id);
		}
	}

	// Return safe response (success and message only)
	const response = json({
		success: true,
		message: data.message || 'Signed out successfully',
	});

	response.headers.append('Set-Cookie', 'session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');
	return response;
}

/**
 * Handle authentication endpoints (signin/signup/signout)
 */
async function handleAuthEndpoints(event: RequestEvent, resolve: Resolve): Promise<Response> {
	// Let the endpoint handle the request first
	const response = await resolve(event);

	// Skip processing for non-JSON responses
	if (!isJsonResponse(response)) return response;

	try {
		const data = (await response.clone().json()) as AuthResult;

		// Handle signout
		if (isSignoutRequest(event, data)) {
			return handleSignoutRequest(event, data);
		}

		// Handle signin/signup success
		if (isAuthSuccess(data)) {
			return handleAuthSuccess(event, data);
		}

		// Default: return original response
		return response;
	} catch (error) {
		// Error parsing JSON or other issue
		return response;
	}
}

/**
 * Process regular (non-auth) requests with session management
 */
async function handleRegularRequests(event: RequestEvent, resolve: Resolve): Promise<Response> {
	// Get or create session
	const session = await getOrCreateSession(event);

	// Set locals for route handlers
	event.locals.session = session;
	event.locals.user = session.userId;

	// Continue with the request
	return resolve(event);
}

/**
 * Get existing session or create a new guest session
 */
async function getOrCreateSession(event: RequestEvent): Promise<Session> {
	const token = event.cookies.get('session');

	// Validate existing token if present
	if (token) {
		const session = await validateSessionToken(token);
		if (session) return session;

		// Clear invalid session cookie
		deleteSessionTokenCookie(event);
	}

	// Create guest session if no valid session exists
	const newToken = generateSessionToken();
	const guestId = generateGuestId();
	const session = await createSession(newToken, guestId, 'guest');

	// Set cookie for new guest session
	setSessionTokenCookie(event, newToken, session.expiresAt);

	return session;
}

// ==================================================================
// FUTURE AUTHENTICATION HANDLERS - SPECIFIC AUTH ACTIONS
// ==================================================================

/**
 * Specifically handle sign-in requests
 * In the future, this could have custom logic for sign-in attempts
 */
async function handleSignInRequest(event: RequestEvent, data: AuthResult, response: Response) {
	// Could add specific sign-in logic:
	// - Different session lengths based on "remember me"
	// - Track login attempts and origins
	// - Apply rate limiting for failed attempts

	return handleAuthSuccess(event, data);
}

/**
 * Specifically handle sign-up requests
 * In the future, this could have custom logic for new accounts
 */
async function handleSignUpRequest(event: RequestEvent, data: AuthResult, response: Response) {
	// Could add specific sign-up logic:
	// - Create specific first-time user sessions
	// - Set onboarding flags
	// - Track registration source

	return handleAuthSuccess(event, data);
}

/**
 * Check if request is specifically a sign-in
 */
function isSignInRequest(event: RequestEvent): boolean {
	return event.url.pathname === '/api/auth/signin';
}

/**
 * Check if request is specifically a sign-up
 */
function isSignUpRequest(event: RequestEvent): boolean {
	return event.url.pathname === '/api/auth/signup';
}

// ==================================================================
// FUTURE SESSION SECURITY ENHANCEMENTS
// ==================================================================

/**
 * Rotate session token after privilege changes
 * Enhances security by issuing a new token when privileges change
 */
async function rotateSessionToken(event: RequestEvent, session: Session): Promise<Session> {
	// Implementation would:
	// - Invalidate the old session
	// - Create a new session with the same user info but new token
	// - Update cookies
	return session; // Placeholder
}

/**
 * Validate session against IP address
 * Adds security by checking if the session is being used from the same IP
 */
async function validateSessionIP(event: RequestEvent, session: Session): Promise<boolean> {
	// Would compare the current IP with the one stored with the session
	return true; // Placeholder
}

/**
 * Generate and validate device fingerprints
 * Adds security by associating sessions with specific devices
 */
async function validateDeviceFingerprint(event: RequestEvent, session: Session): Promise<boolean> {
	// Would compare browser/device characteristics
	return true; // Placeholder
}

// ==================================================================
// FUTURE SESSION EXPERIENCE FEATURES
// ==================================================================

/**
 * Handle "remember me" functionality
 * Creates longer-lived sessions when requested
 */
async function handleRememberMeSession(
	event: RequestEvent,
	userId: string,
	rememberMe: boolean
): Promise<Session> {
	// Would create a session with different expiration times based on preference
	const newToken = generateSessionToken();
	// Session duration would vary based on rememberMe
	const expiryDays = rememberMe ? 30 : 1;
	const session = await createSession(newToken, userId, 'user');
	return session;
}

/**
 * Check if a session needs refreshing
 * Used to extend session lifetime during active use
 */
function shouldRefreshSession(session: Session): boolean {
	const now = Math.floor(Date.now() / 1000);
	// True if session is more than 75% through its lifetime
	return false; // Placeholder
}

/**
 * Check for session inactivity
 * Could be used to expire idle sessions
 */
function checkSessionActivity(session: Session): boolean {
	// Would check when the session was last active
	return true; // Placeholder
}

// ==================================================================
// FUTURE SESSION MANAGEMENT UI SUPPORT
// ==================================================================

/**
 * Get all active sessions for a user
 * For displaying in user account settings
 */
async function getUserSessions(userId: string): Promise<Session[]> {
	// Would retrieve all active sessions for a user
	return []; // Placeholder
}

/**
 * Track session activity for user review
 * For showing login history to users
 */
async function logSessionActivity(session: Session, activity: string): Promise<void> {
	// Would record actions taken in a session
}

/**
 * Revoke specific session by ID
 * For allowing users to log out specific devices
 */
async function revokeSpecificSession(sessionId: string): Promise<void> {
	// Would invalidate just one specific session
}

// ==================================================================
// FUTURE ADVANCED SESSION FEATURES
// ==================================================================

/**
 * Create session with specific sensitivity level
 * For different types of sessions (e.g., admin vs regular use)
 */
async function createSensitivitySession(
	userId: string,
	sensitivityLevel: string
): Promise<Session> {
	// Would create a session with different permissions/durations
	return {} as Session; // Placeholder
}

/**
 * Require step-up authentication for sensitive operations
 * For requiring re-auth for important actions
 */
async function requireStepUpAuth(event: RequestEvent, session: Session): Promise<boolean> {
	// Would check if a recent authentication is needed for sensitive action
	return false; // Placeholder
}

/**
 * Track and store session context
 * For security analysis and user experience
 */
async function enrichSessionContext(session: Session, context: any): Promise<void> {
	// Would add metadata like entry point, referrer, etc.
}

// ==================================================================
// ENHANCED AUTH ENDPOINTS HANDLER - WOULD REPLACE CURRENT VERSION
// ==================================================================

/**
 * Enhanced version of handleAuthEndpoints with specific auth type handling
 * For future implementation when more specialized auth flows are needed
 */
async function enhancedAuthEndpointsHandler(
	event: RequestEvent,
	resolve: Resolve
): Promise<Response> {
	const response = await resolve(event);

	if (!isJsonResponse(response)) return response;

	try {
		const data = (await response.clone().json()) as AuthResult;

		// Enhanced handlers for specific auth types
		if (isSignInRequest(event) && isAuthSuccess(data)) {
			return handleSignInRequest(event, data, response);
		}

		if (isSignUpRequest(event) && isAuthSuccess(data)) {
			return handleSignUpRequest(event, data, response);
		}

		if (isSignoutRequest(event, data)) {
			return handleSignoutRequest(event, data);
		}

		return response;
	} catch (error) {
		return response;
	}
}

// ==================================================================
// MAIN SESSION HANDLER - KEEP AS IS
// ==================================================================

export const sessionHandler: Handle = async ({ event, resolve }) => {
	// Special handling for auth API endpoints
	if (event.url.pathname.startsWith('/api/auth/')) {
		return handleAuthEndpoints(event, resolve);
		// Future: return enhancedAuthEndpointsHandler(event, resolve);
	}

	// Standard flow for non-auth endpoints
	return handleRegularRequests(event, resolve);
};
