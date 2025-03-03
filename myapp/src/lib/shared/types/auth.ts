export interface Session {
	token: string;
	userId: string;
	expirationTime: number;
	role: string;
}

export interface SignUpSuccess {
	success: boolean;
	message: string;
	userId: string;
}

export interface SignUpFailure {
	success: boolean;
	error: string;
	message: string;
}

export function isSignUpFailure(response: any): response is SignUpFailure {
	return (
		typeof response === 'object' &&
		response !== null &&
		'success' in response &&
		response.success === false &&
		'error' in response &&
		typeof response.error === 'string' &&
		'message' in response &&
		typeof response.message === 'string'
	);
}

export function isSignUpSuccess(response: any): response is SignUpSuccess {
	return (
		typeof response === 'object' &&
		response !== null &&
		'success' in response &&
		response.success === true &&
		'userId' in response &&
		typeof response.userId === 'string' &&
		'message' in response &&
		typeof response.message === 'string'
	);
}
