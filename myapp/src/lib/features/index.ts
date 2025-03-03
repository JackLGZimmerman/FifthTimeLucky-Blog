// Base API utilities and configuration

import { env } from '$env/dynamic/public';
const BASE_URL = env.PUBLIC_BASE_URL || 'http://localhost:3000';

// Make this a proper discriminated union with strict true/false for success
export type ApiResponse<T> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			errors: Array<{ message: string }>;
	  };

// Common fetch wrapper with error handling
export async function apiFetch<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<ApiResponse<T>> {
	try {
		const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
		const url = `${BASE_URL}${normalizedEndpoint}`;

		const response = await fetch(url, {
			...options,
			credentials: 'include', // Include credentials for session cookies
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest', // Add this to identify AJAX requests
				...options.headers,
			},
		});

		const contentType = response.headers.get('content-type');

		if (!contentType || !contentType.includes('application/json')) {
			return {
				success: false,
				errors: [{ message: 'Server returned non-JSON response' }],
			};
		}

		try {
			const data = await response.json();

			if (!response.ok) {
				return {
					success: false,
					errors: data.errors || [{ message: data.message || 'An error occurred' }],
				};
			}

			return { success: true, data: data as T };
		} catch (parseError) {
			return {
				success: false,
				errors: [{ message: 'Failed to parse server response as JSON' }],
			};
		}
	} catch (networkError) {
		return {
			success: false,
			errors: [{ message: networkError instanceof Error ? networkError.message : 'Network error' }],
		};
	}
}
