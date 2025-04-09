import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload{
    id: string,
    email:string
}

declare global{
    namespace Express{
        interface Request{
            currentUser?: UserPayload;
        }
    }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    if (typeof payload === 'object' && 'id' in payload && 'email' in payload) {
        req.currentUser = payload as UserPayload;
      }
  } catch (err) {}

  next();
};
