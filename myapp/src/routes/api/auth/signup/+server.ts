import { json } from '@sveltejs/kit';
import { createNewUser } from '$lib/server/utils/authorisation';
import { z } from 'zod';
import type { RequestHandler } from './$types';

const signupSchema = z.object({
	username: z.string().min(3).max(20),
	password: z.string().min(8).max(20),
	email: z.string().email(),
});

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		const result = signupSchema.safeParse(data);
		if (!result.success) {
			return json({ success: false, errors: result.error.errors }, { status: 400 });
		}

		const user = await createNewUser(result.data.username, result.data.email, result.data.password);

		return json({
			success: true,
			userId: user.id,
			username: user.username,
			role: 'user',
		});
	} catch (err) {
		return json(
			{
				success: false,
				message: err instanceof Error ? err.message : 'An error occurred during signup',
			},
			{ status: 400 }
		);
	}
};
