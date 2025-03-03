import { json } from '@sveltejs/kit';
import { authenticateUser } from '$lib/server/utils/authorisation'; // This is perfectly safe
import type { RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event: RequestEvent) => {
	try {
		const { username, password } = await event.request.json();

		if (!username || !password) {
			return json(
				{ success: false, message: 'Username and password are required' },
				{ status: 400 }
			);
		}

		// Authenticate user (no session creation here)
		const result = await authenticateUser(event, username, password);

		if (result.success) {
			return json({
				success: true,
				userId: result.user.id,
				username: result.user.username,
				role: 'user', // Or fetch from user object if you store roles
			});
		} else {
			return json({ success: false, message: result.message }, { status: 401 });
		}
	} catch (err) {
		console.error('Signin error:', err);

		return json({ success: false, message: 'Invalid username or password' }, { status: 401 });
	}
};
