import jwt from 'jsonwebtoken';
import { User } from '@/types/auth.d';

const SECRET = process.env.JWT_SECRET || 'aboba';

export const generateToken = (user: User): string => {
    return jwt.sign(user, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): User | null => {
    try {
        return jwt.verify(token, SECRET) as User;
    } catch {
        return null;
    }
};