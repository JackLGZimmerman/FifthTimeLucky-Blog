// src/lib/server/abacPolicies.ts

import type { Subject, Role } from '$lib/server/handler/abac/types/subjects';
import { GUEST_ROLE } from '$lib/server/handler/abac/types/subjects';
import { UserRole } from '$lib/server/models/users'; // Import the UserRole enum
import type {
	BlogPost,
	Comment,
	Reaction,
	ReactionType,
} from '$lib/server/handler/abac/types/resources';
// Import the function (not as a type)
import { isSpecialReaction } from '$lib/server/handler/abac/types/resources';
import type { PolicySet } from '$lib/server/handler/abac/types/actions';
import { getInheritedRoles } from './roleHierarchy';

/**
 * Common policy rules
 */
const policyRules = {
	isPostAuthor: (subject: Subject, post: BlogPost) => subject.id === post.authorId,
	isPublicPost: (_subject: Subject, post: BlogPost) => post.isPublic,
	isCommentAuthor: (subject: Subject, comment: Comment) => subject.id === comment.authorId,

	isPostOwnerForComment: (subject: Subject, comment: Comment) => {
		// In a real implementation, you would load the post and check
		// This is a placeholder that would need database integration
		return false; // post.authorId === subject.id
	},

	isReactionOwner: (subject: Subject, reaction: Reaction) => subject.id === reaction.userId,
	isBasicReactionType: (_subject: Subject, reaction: Reaction) =>
		['like', 'dislike'].includes(reaction.type),
	isSpecialReactionType: (_subject: Subject, reaction: Reaction) =>
		['favorite', 'superlike', 'insightful'].includes(reaction.type),
};

/**
 * Base policy definitions by role without inheritance
 * These are the explicit policies defined for each role
 */
const basePolicySet: PolicySet = {
	[GUEST_ROLE]: {
		post: {
			read: policyRules.isPublicPost,
		},
		comment: {
			read: true,
		},
		reaction: {
			read: true,
		},
	},

	[UserRole.USER]: {
		post: {
			create: true,
			update: policyRules.isPostAuthor,
			delete: policyRules.isPostAuthor,
			publish: policyRules.isPostAuthor,
			unpublish: policyRules.isPostAuthor,
		},
		comment: {
			create: true,
			update: policyRules.isCommentAuthor,
			delete: policyRules.isCommentAuthor,
			report: true,
		},
		reaction: {
			create: (subject, reaction) => !isSpecialReaction(reaction.type),
			delete: policyRules.isReactionOwner,
		},
	},

	[UserRole.SUPER_USER]: {
		post: {
			delete: true, // Override USER's condition
			feature: true, // New policy
		},
		comment: {
			update: (subject, comment) =>
				policyRules.isCommentAuthor(subject, comment) ||
				policyRules.isPostOwnerForComment(subject, comment),
			pin: true, // New policy
		},
		reaction: {
			createSpecial: true, // New policy
		},
	},

	[UserRole.ADMIN]: {
		post: {
			update: true, // Override USER's and SUPER_USER's conditions
		},
		comment: {
			update: true, // Override all previous conditions
			delete: true, // Override USER's condition
		},
		reaction: {
			// Inherits everything from SUPER_USER
		},
	},

	[UserRole.SUPER_ADMIN]: {
		// All policies inherited from ADMIN
		// Could add system-level policies here
	},
};

/**
 * Builds the effective policies by applying inheritance
 * @returns The complete policy set with all inherited policies
 */
function buildEffectivePolicySet(): PolicySet {
	const effectivePolicySet: PolicySet = {};

	// For each role, build its effective policy by merging from its parents
	Object.keys(basePolicySet).forEach((roleKey) => {
		const role = roleKey as Role;

		// Start with an empty policy for this role
		effectivePolicySet[roleKey] = {};

		// Get all roles this role inherits from, in order
		const inheritedRoles = [...getInheritedRoles(role), role];

		// For each inherited role, merge its policies
		inheritedRoles.forEach((inheritedRole) => {
			const rolePolicy = basePolicySet[inheritedRole as keyof typeof basePolicySet];
			if (!rolePolicy) return;

			// For each resource type in the inherited role
			Object.keys(rolePolicy).forEach((resourceType) => {
				// Initialize the resource type in the effective policy if it doesn't exist
				if (!effectivePolicySet[roleKey][resourceType]) {
					effectivePolicySet[roleKey][resourceType] = {};
				}

				// Merge the actions from the inherited role
				const resourcePolicy = rolePolicy[resourceType];
				Object.keys(resourcePolicy).forEach((action) => {
					// Only override if the action doesn't already exist or if we're processing the current role
					// (last role in the inheritance chain, which should override any inherited policies)
					if (
						inheritedRole === role ||
						effectivePolicySet[roleKey][resourceType][action] === undefined
					) {
						effectivePolicySet[roleKey][resourceType][action] = resourcePolicy[action];
					}
				});
			});
		});
	});

	return effectivePolicySet;
}

/**
 * The complete policy set with all inherited policies
 */
export const policySet = buildEffectivePolicySet();

/**
 * Helper function to check if a subject can perform an action
 */
export function evaluatePolicy(
	role: string,
	resourceType: string,
	action: string,
	subject?: Subject,
	resource?: any
): boolean {
	const rolePolicy = policySet[role as keyof typeof policySet];
	if (!rolePolicy) return false;

	const resourcePolicy = rolePolicy[resourceType as keyof typeof rolePolicy];
	if (!resourcePolicy) return false;

	const policyValue = resourcePolicy[action as keyof typeof resourcePolicy];

	if (policyValue === undefined) return false;
	if (typeof policyValue === 'boolean') return policyValue;

	if (typeof policyValue === 'function' && subject && resource) {
		return policyValue(subject, resource);
	}

	return false;
}
