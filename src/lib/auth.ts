import { users } from './api';
import type { User } from './api';

export interface AuthSession {
  user: User | null;
  token: string | null;
}

export const auth = {
  // Simple password hashing (for demo only - use proper hashing in production)
  hashPassword: (password: string): string => {
    return btoa(password); // Base64 encoding for demo
  },

  verifyPassword: (password: string, hash: string): boolean => {
    return btoa(password) === hash;
  },

  // Sign up
  signup: (email: string, password: string, name: string, role: 'patient' | 'medecin' | 'secretaire' = 'patient') => {
    try {
      const existing = users.getByEmail(email);
      if (existing) {
        return { error: 'User already exists', user: null };
      }

      const user = users.create({
        id: '',
        email,
        password: auth.hashPassword(password),
        name,
        role,
        createdAt: new Date().toISOString(),
      });

      const token = auth.generateToken(user.id);
      sessionStorage.setItem('auth-token', token);
      sessionStorage.setItem('auth-user', JSON.stringify(user));

      return { user, token, error: null };
    } catch (error) {
      return { error: String(error), user: null };
    }
  },

  // Login
  login: (email: string, password: string) => {
    try {
      const user = users.getByEmail(email);
      if (!user) {
        return { error: 'User not found', user: null };
      }

      if (!auth.verifyPassword(password, user.password)) {
        return { error: 'Invalid password', user: null };
      }

      const token = auth.generateToken(user.id);
      sessionStorage.setItem('auth-token', token);
      sessionStorage.setItem('auth-user', JSON.stringify(user));

      return { user, token, error: null };
    } catch (error) {
      return { error: String(error), user: null };
    }
  },

  // Get current session
  getSession: (): AuthSession => {
    const token = sessionStorage.getItem('auth-token');
    const userStr = sessionStorage.getItem('auth-user');
    const user = userStr ? JSON.parse(userStr) : null;

    return { user, token };
  },

  // Logout
  logout: () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('auth-user');
    return { error: null };
  },

  // Generate token (simple JWT-like token for demo)
  generateToken: (userId: string): string => {
    return btoa(JSON.stringify({ userId, timestamp: Date.now() }));
  },

  // Verify token
  verifyToken: (token: string): boolean => {
    try {
      const decoded = JSON.parse(atob(token));
      return decoded.userId !== undefined;
    } catch {
      return false;
    }
  },
};

export default auth;
