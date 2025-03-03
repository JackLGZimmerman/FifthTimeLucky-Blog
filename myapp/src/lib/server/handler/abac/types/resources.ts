// src/lib/types/resources.ts

/**
 * Resource definitions for ABAC system
 * Resources are objects that can be accessed by subjects
 */

// Base resource types
export type ResourceType = 'post' | 'comment' | 'reaction';
export type Resource = BlogPost | Comment | Reaction;

// Blog post resource
export interface BlogPost {
	id: string;
	authorId: string;
	title: string;
	content: string;
	summary?: string;
	tags: string[];
	isPublic: boolean;
	createdAt: string;
	updatedAt?: string;
	viewCount: number;
	commentCount: number;
	reactionCounts: Record<ReactionType, number>;
}

// Comment resource
export interface Comment {
	id: string;
	authorId: string;
	postId: string;
	content: string;
	createdAt: string;
	updatedAt?: string;
	replyToId?: string;
	reactionCounts: Record<ReactionType, number>;
}

// Reaction types with different permission levels
export type BasicReactionType = 'like' | 'dislike';
export type SpecialReactionType = 'favorite' | 'superlike' | 'insightful';
export type ReactionType = BasicReactionType | SpecialReactionType;

// Reaction resource
export interface Reaction {
	id: string;
	userId: string;
	targetId: string;
	targetType: 'post' | 'comment';
	type: ReactionType;
	createdAt: string;
}

// Type guards for resources
export function isBlogPost(resource: unknown): resource is BlogPost {
	return (
		!!resource &&
		typeof resource === 'object' &&
		'authorId' in resource &&
		'title' in resource &&
		'isPublic' in resource
	);
}

export function isComment(resource: unknown): resource is Comment {
	return (
		!!resource &&
		typeof resource === 'object' &&
		'authorId' in resource &&
		'postId' in resource &&
		'content' in resource
	);
}

export function isReaction(resource: unknown): resource is Reaction {
	return (
		!!resource &&
		typeof resource === 'object' &&
		'userId' in resource &&
		'targetId' in resource &&
		'targetType' in resource &&
		'type' in resource
	);
}

// Helper function to check reaction types
export function isBasicReaction(reactionType: ReactionType): reactionType is BasicReactionType {
	return reactionType === 'like' || reactionType === 'dislike';
}

export function isSpecialReaction(reactionType: ReactionType): reactionType is SpecialReactionType {
	return ['favorite', 'superlike', 'insightful'].includes(reactionType);
}
