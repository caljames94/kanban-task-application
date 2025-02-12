import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (token == null) {
    res.status(401).json({ message: 'Token is required' });
    return;
  }

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: 'JWT_SECRET is not defined' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    req.user = user as JwtPayload;
    next();
  });
};
