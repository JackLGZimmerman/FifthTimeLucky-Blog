/**
 * Utility functions for handling Redis errors
 */

export type RedisErrorResponse = {
  isRedisError: true;
  message: string;
  originalError: any;
}

export function isRedisError(error: any): boolean {
  return error?.message?.includes('MISCONF') || 
         error?.message?.includes('Redis is configured to save RDB snapshots');
}

export function handleRedisError(error: any): RedisErrorResponse {
  console.error('Redis error occurred:', error);
  
  return {
    isRedisError: true,
    message: 'Server temporarily unavailable. Please try again later.',
    originalError: error
  };
}
