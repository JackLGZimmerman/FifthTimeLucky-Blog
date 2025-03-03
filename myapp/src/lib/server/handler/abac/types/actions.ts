import type { Subject, Role } from './subjects';
import type { BlogPost, Comment, Reaction } from './resources';

// Generic policy function type
export type PolicyRule<T = any> = (
	subject: Subject,
	resource: T,
	context?: Record<string, unknown>
) => boolean;

// Policy can be a boolean or a function
export type PolicyValue<T = any> = boolean | PolicyRule<T>;

// Resource policy interface - maps action names to policy values
export interface ResourcePolicy {
	[action: string]: PolicyValue;
}

// Role policy interface - maps resource types to their policies
export interface RolePolicySet {
	[resourceType: string]: ResourcePolicy;
}

// Global policy interface - maps role names to their policies
export interface PolicySet {
	[role: string]: RolePolicySet;
}

// Define specific action types for each resource

// Post actions
export type PostAction =
	| 'read'
	| 'create'
	| 'update'
	| 'delete'
	| 'publish'
	| 'unpublish'
	| 'feature';
export interface PostPolicy {
	read?: PolicyValue<BlogPost>;
	create?: PolicyValue<BlogPost>;
	update?: PolicyValue<BlogPost>;
	delete?: PolicyValue<BlogPost>;
	publish?: PolicyValue<BlogPost>;
	unpublish?: PolicyValue<BlogPost>;
	feature?: PolicyValue<BlogPost>;
	[key: string]: PolicyValue<BlogPost> | undefined;
}

// Comment actions
export type CommentAction = 'read' | 'create' | 'update' | 'delete' | 'pin' | 'report';
export interface CommentPolicy {
	read?: PolicyValue<Comment>;
	create?: PolicyValue<Comment>;
	update?: PolicyValue<Comment>;
	delete?: PolicyValue<Comment>;
	pin?: PolicyValue<Comment>;
	report?: PolicyValue<Comment>;
	[key: string]: PolicyValue<Comment> | undefined;
}

// Reaction actions
export type ReactionAction = 'read' | 'create' | 'delete' | 'createSpecial';
export interface ReactionPolicy {
	read?: PolicyValue<Reaction>;
	create?: PolicyValue<Reaction>;
	delete?: PolicyValue<Reaction>;
	createSpecial?: PolicyValue<Reaction>;
	[key: string]: PolicyValue<Reaction> | undefined;
}

// Union of all possible actions
export type Action = PostAction | CommentAction | ReactionAction;

/**
 * Helper type to extract all possible actions for a given resource type
 * from the policy definition
 */
export type ResourceActions<T extends string> = {
	[R in keyof PolicySet]: {
		[K in T]?: {
			[Action in string]: PolicyValue;
		};
	};
}[keyof PolicySet][T] extends infer U
	? U extends Record<string, any>
		? keyof U
		: never
	: never;

/**
 * Helper type to get all defined resource types in the policy
 */
export type ResourceTypes = {
	[R in keyof PolicySet]: keyof PolicySet[R];
}[keyof PolicySet];
