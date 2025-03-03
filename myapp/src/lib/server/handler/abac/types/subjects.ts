import { UserRole } from '../../../models/users';

/**
 * Subject definitions for ABAC system
 * Subjects are entities that can request access to resources
 */

// Define a constant for guest role to ensure consistent usage
export const GUEST_ROLE = 'guest' as const;
export type GuestRoleType = typeof GUEST_ROLE;

// Role type combines system roles from UserRole enum with guest role
export type Role = UserRole | GuestRoleType;

// Base subject interface with common properties
export interface BaseSubject {
	id: string;
	role: Role;
	createdAt: string;
}

// Guest subjects (unauthenticated)
export interface GuestSubject extends BaseSubject {
	role: GuestRoleType;
	sessionId: string;
}

// Authenticated subject with common properties
interface AuthenticatedSubject extends BaseSubject {
	username: string;
	email: string;
	displayName: string;
	avatarUrl?: string;
}

// Create a mapped type for all user role subjects
export type UserRoleSubjects = {
	[K in UserRole]: AuthenticatedSubject & { role: K };
};

// Export individual typed interfaces for each role
export type UserSubject = UserRoleSubjects[UserRole.USER];
export type SuperUserSubject = UserRoleSubjects[UserRole.SUPER_USER];
export type AdminSubject = UserRoleSubjects[UserRole.ADMIN];
export type SuperAdminSubject = UserRoleSubjects[UserRole.SUPER_ADMIN];

// Union type for all possible subjects
export type Subject =
	| GuestSubject
	| UserSubject
	| SuperUserSubject
	| AdminSubject
	| SuperAdminSubject;

// Type guard functions
export function isGuest(subject: Subject): subject is GuestSubject {
	return subject.role === GUEST_ROLE;
}

export function isUser(subject: Subject): subject is UserSubject {
	return subject.role === UserRole.USER;
}

export function isSuperUser(subject: Subject): subject is SuperUserSubject {
	return subject.role === UserRole.SUPER_USER;
}

export function isAdmin(subject: Subject): subject is AdminSubject {
	return subject.role === UserRole.ADMIN;
}

export function isSuperAdmin(subject: Subject): subject is SuperAdminSubject {
	return subject.role === UserRole.SUPER_ADMIN;
}

// Helper function to check if a subject has at least a specified role level
export function hasMinimumRole(subject: Subject, minimumRole: UserRole): boolean {
	// Guest can never satisfy a minimum UserRole requirement
	if (subject.role === GUEST_ROLE) return false;

	const roleValues: Record<UserRole, number> = {
		[UserRole.USER]: 1,
		[UserRole.SUPER_USER]: 2,
		[UserRole.ADMIN]: 3,
		[UserRole.SUPER_ADMIN]: 4,
	};

	return roleValues[subject.role] >= roleValues[minimumRole];
}
