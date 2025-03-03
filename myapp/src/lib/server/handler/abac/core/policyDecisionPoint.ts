/**
 * Policy Decision Point (PDP) - Evaluates access requests against policies
 */

import { policySet } from './abacPolicies';
import type { Subject } from '$lib/server/handler/abac/types/subjects';
import type { Resource, ResourceType } from '$lib/server/handler/abac/types/resources';
import {
	isBlogPost,
	isComment,
	isReaction,
	isSpecialReaction,
} from '$lib/server/handler/abac/types/resources';
import type {
	Action,
	PostAction,
	CommentAction,
	ReactionAction,
	PostPolicy,
	CommentPolicy,
	ReactionPolicy,
} from '$lib/server/handler/abac/types/actions';

// Error classes
export class PolicyError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'PolicyError';
	}
}

export class AccessDeniedError extends PolicyError {
	constructor(role: string, action: string, resourceType: string) {
		super(`Access denied: ${role} cannot ${action} ${resourceType}`);
		this.name = 'AccessDeniedError';
	}
}

// Request interface for policy decisions
export interface AccessRequest {
	subject: Subject;
	resourceType: ResourceType;
	action: Action;
	resource: Resource;
	context?: Record<string, unknown>;
}

/**
 * Evaluates if a subject can perform an action on a resource
 */
export function evaluateAccess(request: AccessRequest): boolean {
	const { subject, resourceType, action, resource, context } = request;

	// Get the policy for this role
	const rolePolicy = policySet[subject.role];
	if (!rolePolicy) {
		return false;
	}

	// Get the policy for this resource type
	const resourcePolicy = rolePolicy[resourceType];
	if (!resourcePolicy) {
		return false;
	}

	// Type-specific action handling based on resource type
	switch (resourceType) {
		case 'post': {
			if (!isBlogPost(resource)) {
				return false; // Resource isn't the expected type
			}

			const postPolicy = resourcePolicy as PostPolicy;
			const postAction = action as PostAction;
			const policyValue = postPolicy[postAction];

			if (policyValue === undefined) {
				return false;
			}

			return typeof policyValue === 'function'
				? policyValue(subject, resource, context)
				: Boolean(policyValue);
		}

		case 'comment': {
			if (!isComment(resource)) {
				return false; // Resource isn't the expected type
			}

			const commentPolicy = resourcePolicy as CommentPolicy;
			const commentAction = action as CommentAction;
			const policyValue = commentPolicy[commentAction];

			if (policyValue === undefined) {
				return false;
			}

			return typeof policyValue === 'function'
				? policyValue(subject, resource, context)
				: Boolean(policyValue);
		}

		case 'reaction': {
			if (!isReaction(resource)) {
				return false; // Resource isn't the expected type
			}

			const reactionPolicy = resourcePolicy as ReactionPolicy;

			// Special handling for special reactions
			if (action === 'create' && isSpecialReaction(resource.type)) {
				const specialPolicy = reactionPolicy['createSpecial'];
				if (specialPolicy === undefined) return false;

				return typeof specialPolicy === 'function'
					? specialPolicy(subject, resource, context)
					: Boolean(specialPolicy);
			}

			const reactionAction = action as ReactionAction;
			const policyValue = reactionPolicy[reactionAction];

			if (policyValue === undefined) {
				return false;
			}

			return typeof policyValue === 'function'
				? policyValue(subject, resource, context)
				: Boolean(policyValue);
		}

		default: {
			return false;
		}
	}
}

/**
 * Main policy decision point function that throws errors for better handling
 */
export function policyDecisionPoint(request: AccessRequest): boolean {
	if (evaluateAccess(request)) {
		return true;
	} else {
		throw new AccessDeniedError(
			request.subject.role,
			request.action as string,
			request.resourceType
		);
	}
}
