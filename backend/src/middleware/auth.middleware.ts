import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type JwtPayload = {
  id: number;
  tipo_usuario: 'admin' | 'capitao';
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token não fornecido ou mal formatado' });
  }else{

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    
    req.user = {
      id: payload.id,
      tipo_usuario: payload.tipo_usuario,
    };

    return next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido ou expirado' });
  }
  }
}
