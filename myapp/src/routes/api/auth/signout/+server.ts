import { json } from '@sveltejs/kit';
import {
	createSession,
	generateSessionToken,
	invalidateSession,
	setSessionTokenCookie,
	deleteSessionTokenCookie,
} from '$lib/server/handler/session/session';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	try {
		// Check if user is authenticated, role != 'guest'
		const locals = event.locals;

		if (!locals.session) {
			console.warn('Sign-out attempted without an active session - possible auth middleware bug');
			return json({ message: 'Authentication required' }, { status: 401 });
		}

		if (!locals.session.role) {
			console.warn('Sign-out attempted without a role - possible auth middleware bug');
			return json({ message: 'Authentication required' }, { status: 401 });
		}

		if (locals.session.role === 'guest') {
			console.warn('Sign-out attempted with a guest session - possible auth middleware bug');
			return json({ message: 'Already signed out' }, { status: 401 });
		}

		// Invalidate current session and create a guest session
		try {
			await invalidateSession(locals.session.id);
			deleteSessionTokenCookie(event);
			const session = await createSession(generateSessionToken(), locals.session.userId, 'guest');
			setSessionTokenCookie(event, session.id, session.expiresAt);
			
			locals.session = session;
			locals.user = session.userId;

			return json({ message: 'Signed out' }, { status: 200 });
		} catch (sessionError) {
			console.error('Error during session operations:', sessionError);
			return json({ message: 'Failed to process sign-out' }, { status: 500 });
		}
	} catch (error) {
		console.error('Unhandled error in sign-out handler:', error);
		return json({ message: 'An unexpected error occurred' }, { status: 500 });
	}
};
