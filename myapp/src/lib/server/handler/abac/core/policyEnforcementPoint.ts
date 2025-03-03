/**
 * Policy Enforcement Point (PEP) for SvelteKit
 * Intercepts requests and enforces access control rules
 */

import type { Handle } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { policyDecisionPoint, AccessDeniedError } from './policyDecisionPoint';
import type { AccessRequest } from './policyDecisionPoint';
import type { Subject } from '$lib/server/handler/abac/types/subjects';
import type { Resource, ResourceType } from '$lib/server/handler/abac/types/resources';
import type { Action } from '$lib/server/handler/abac/types/actions';

export const policyEnforcementPoint: Handle = async ({ event, resolve }) => {
	// First check if this is a public route that doesn't need authentication
	if (isPublicRoute(event.url.pathname)) {
		return resolve(event);
	}

	// Get user from locals (set during authentication)
	const subject = event.locals.user as unknown as Subject | undefined;

	// If no authenticated user found
	if (!subject) {
		// For API requests, return 401 status
		if (event.url.pathname.startsWith('/api/')) {
			return json(
				{
					success: false,
					errors: [{ message: 'Authentication required' }],
				},
				{ status: 401 }
			);
		}
	}

	// For authenticated API requests that need policy checks
	if (subject && event.url.pathname.startsWith('/api/')) {
		const resourceInfo = extractResourceInfo(event);
		if (resourceInfo) {
			const { resourceType, action, resource } = resourceInfo;

			// Check permissions
			const allowed = policyDecisionPoint({
				subject,
				resourceType,
				action,
				resource,
				context: {
					method: event.request.method,
					url: event.url,
					headers: Object.fromEntries(event.request.headers.entries()),
				},
			});

			if (!allowed) {
				return json(
					{
						success: false,
						errors: [{ message: 'Access denied' }],
					},
					{ status: 403 }
				);
			}
		}
	}

	// Let the request proceed
	return resolve(event);
};
/**
 * Helper functions for the PEP
 */

// Check if a route is public (doesn't require authentication)
function isPublicRoute(pathname: string): boolean {
	// Auth API endpoints should always be public
	if (pathname.startsWith('/api/auth/')) {
		return true;
	}

	const publicRoutes = ['/', '/login', '/register', '/about', '/privacy', '/terms'];

	return (
		publicRoutes.includes(pathname) ||
		(pathname.startsWith('/blog/') && pathname.split('/').length === 3)
	); // Public blog post pages
}

// Extract resource info from a request
function extractResourceInfo(
	event: any
): { resourceType: ResourceType; action: Action; resource: Resource } | null {
	const { pathname, searchParams } = event.url;
	const method = event.request.method;

	// Example mapping of HTTP methods to actions
	const methodToAction: Record<string, string> = {
		GET: 'read',
		POST: 'create',
		PUT: 'update',
		PATCH: 'update',
		DELETE: 'delete',
	};

	// Extract resource type and ID from URL patterns
	const patterns = [
		{
			regex: /^\/api\/posts\/([^\/]+)$/,
			resourceType: 'post' as ResourceType,
			getAction: (method: string) => {
				if (method === 'POST' && searchParams.get('action') === 'publish') return 'publish';
				if (method === 'POST' && searchParams.get('action') === 'unpublish') return 'unpublish';
				return methodToAction[method];
			},
		},
		{
			regex: /^\/api\/posts\/([^\/]+)\/comments\/([^\/]+)$/,
			resourceType: 'comment' as ResourceType,
			getAction: (method: string) => {
				if (method === 'POST' && searchParams.get('action') === 'pin') return 'pin';
				return methodToAction[method];
			},
		},
		{
			regex: /^\/api\/posts\/([^\/]+)\/reactions$/,
			resourceType: 'reaction' as ResourceType,
			getAction: (method: string) => methodToAction[method],
		},
	];

	// Find matching pattern
	for (const pattern of patterns) {
		const match = pathname.match(pattern.regex);
		if (match) {
			const action = pattern.getAction(method) as Action;

			// In a real application, you would retrieve the actual resource
			// For now, we're creating a placeholder resource
			const resource = createPlaceholderResource(pattern.resourceType, match[1]);

			return {
				resourceType: pattern.resourceType,
				action,
				resource,
			};
		}
	}

	return null;
}

// Create a placeholder resource (in a real app, you'd load this from your database)
function createPlaceholderResource(type: ResourceType, id: string): Resource {
	switch (type) {
		case 'post':
			return {
				id,
				authorId: 'unknown', // In real app, you'd query the DB
				title: 'Placeholder',
				content: '',
				tags: [],
				isPublic: true,
				createdAt: new Date().toISOString(),
				viewCount: 0,
				commentCount: 0,
				reactionCounts: {
					like: 0,
					dislike: 0,
					favorite: 0,
					superlike: 0,
					insightful: 0,
				},
			};
		case 'comment':
			return {
				id,
				authorId: 'unknown',
				postId: 'unknown',
				content: '',
				createdAt: new Date().toISOString(),
				reactionCounts: {
					like: 0,
					dislike: 0,
					favorite: 0,
					superlike: 0,
					insightful: 0,
				},
			};
		case 'reaction':
			return {
				id,
				userId: 'unknown',
				targetId: 'unknown',
				targetType: 'post',
				type: 'like',
				createdAt: new Date().toISOString(),
			};
	}
}
