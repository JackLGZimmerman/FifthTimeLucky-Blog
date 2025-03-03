import { sequence } from '@sveltejs/kit/hooks';
import { policyEnforcementPoint } from '$lib/server/handler/abac/core/policyEnforcementPoint';
import { sessionHandler } from '$lib/server/handler/session/sessionHandler';

// Apply our hooks in sequence - modular and clean
export const handle = sequence(sessionHandler, policyEnforcementPoint);
