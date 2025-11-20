import jwt, { SignOptions, Secret } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
}

export const generateToken = (payload: JWTPayload): string => {
  const options: SignOptions = { expiresIn: JWT_EXPIRY } as SignOptions
  return jwt.sign(payload, JWT_SECRET as Secret, options);
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
};
