import { Request, Response, NextFunction } from 'express';

export function requireArtistRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  if (req.user.role !== 'artista') {
    return res.status(403).json({
      message: 'Acesso negado. Apenas usuários com perfil de artista podem realizar esta ação.',
    });
  }

  return next();
}
