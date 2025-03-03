// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { Session } from '$lib/server/handler/session/session';

declare global {
	namespace App {
		interface Locals {
			session: Session | null;
			user: string;
		}
		// Add any other interfaces, such as PageData, Error, Platform if needed
	}
}

export {};
