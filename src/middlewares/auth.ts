import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default function auth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const JWT_SECRET = 'senhaSecreta';

    const payload = jwt.verify(token, JWT_SECRET);

    req.body.user = payload;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
