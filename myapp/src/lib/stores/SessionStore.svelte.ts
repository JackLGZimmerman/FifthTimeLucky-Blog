import type { Session } from '$lib/server/handler/session/session';

class SessionStore {
	session: Session | null = {
		id: '',
		userId: '',
		expiresAt: 0,
		role: '',
	};
	user: string | null = '';

	updateSessionStore(session: Session | null, user: string | null) {
		this.session = session;
		this.user = user;
	}

	isAuthenticated(): boolean {
		return !!this.session && this.session.role !== 'guest';
	}
}


export const sessionStore = new SessionStore();