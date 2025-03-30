import jwt from 'jsonwebtoken';
import { User, Role } from '@prisma/client';

// Validate environment variable
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV !== 'test') {
  throw new Error('JWT_SECRET environment variable is not defined');
}

const TOKEN_EXPIRY = '24h';

export interface TokenPayload {
  id: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export function generateToken(user: Omit<User, 'password_hash' | 'created_at' | 'updated_at'>): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }

  const payload: TokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: TOKEN_EXPIRY,
    algorithm: 'HS256' // Explicitly set algorithm
  });
}

export function verifyToken(token: string): TokenPayload {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    return decoded as TokenPayload;
  } catch {
    throw new Error('Invalid or expired token');
  }
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token);
    return decoded as TokenPayload;
  } catch {
    return null;
  }
}