const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'comprador' | 'artista';
}

export interface AuthResponse {
  message: string;
  user: AuthUser;
  token: string;
}

export const TOKEN_KEY = 'framer_token';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao comunicar com o servidor.');
  }

  return data;
}