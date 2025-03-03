import { apiFetch } from '../index';

export interface UserData {
  userId: string;
  username: string;
  role: string;
}

export async function signIn(username: string, password: string) {
  return apiFetch<UserData>('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ 
      username, 
      password })
  });
}

export async function signUp(
  username: string, 
  password: string, 
  email: string
) {
  return apiFetch<UserData>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ 
      username, 
      password, 
      email })
  });
}

export async function signOut() {
  return apiFetch<{message: string}>('/api/auth/signout', {
    method: 'POST'
  });
}
