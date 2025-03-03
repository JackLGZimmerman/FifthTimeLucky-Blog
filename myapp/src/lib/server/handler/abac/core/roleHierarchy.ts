/**
 * Role Hierarchy Module for ABAC system
 * Defines the inheritance relationships between roles
 */

import { UserRole } from '$lib/server/models/users';
import { GUEST_ROLE, type Role } from '../types/subjects';

// Define role inheritance as a hierarchical map
// Each role inherits permissions from roles in its array
const roleHierarchy: Record<Role, Role[]> = {
	// Guest role doesn't inherit from anything
	[GUEST_ROLE]: [],

	// Regular user inherits from guest
	[UserRole.USER]: [GUEST_ROLE],

	// Super user inherits from user
	[UserRole.SUPER_USER]: [UserRole.USER],

	// Admin inherits from super user
	[UserRole.ADMIN]: [UserRole.SUPER_USER],

	// Super admin inherits from admin
	[UserRole.SUPER_ADMIN]: [UserRole.ADMIN],
};

/**
 * Gets all roles that a given role inherits from, in order of inheritance
 * (from most distant ancestor to immediate parent)
 */
export function getInheritedRoles(role: Role): Role[] {
	const result: Role[] = [];
	const queue = [...(roleHierarchy[role] || [])];

	// Process each parent role
	while (queue.length > 0) {
		const current = queue.shift() as Role;

		// Add to result if not already included
		if (!result.includes(current)) {
			result.unshift(current); // Add at beginning to maintain proper order

			// Add this role's parents to the queue
			queue.push(...(roleHierarchy[current] || []));
		}
	}

	return result;
}

/**
 * Checks if a role has at least the specified minimum role level
 */
export function hasMinimumRole(role: Role, minimumRole: UserRole): boolean {
	// Guest can never satisfy a minimum UserRole requirement
	if (role === GUEST_ROLE) return false;

	// A role has at least its own level
	if (role === minimumRole) return true;

	// Check if the minimum role is in this role's inheritance chain
	return getInheritedRoles(role).includes(minimumRole);
}
