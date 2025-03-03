import { apiFetch } from '../index';
import { isRedisError, handleRedisError } from '$lib/server/utils/redisErrorHandler';

export interface UserData {
  userId: string;
  username: string;
  role: string;
}

export async function signIn(username: string, password: string) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        user: data
      };
    }
    
    return {
      success: false,
      errors: [{ message: data.message || 'Invalid username or password' }]
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      errors: [{ message: 'Unable to connect to authentication service' }]
    };
  }
}

export async function signUp(
  username: string, 
  password: string, 
  email: string
) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        user: data
      };
    }
    
    return {
      success: false,
      errors: [{ message: data.message || 'Unable to sign up' }]
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      success: false,
      errors: [{ message: 'Unable to connect to authentication service' }]
    };
  }
}

export async function signOut() {
  return apiFetch<{message: string}>('/api/auth/signout', {
    method: 'POST'
  });
}
