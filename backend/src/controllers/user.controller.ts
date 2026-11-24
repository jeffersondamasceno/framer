import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const updateRoleSchema = z.object({
  role: z.enum(['comprador', 'artista'], {
    errorMap: () => ({ message: 'Perfil deve ser "comprador" ou "artista".' }),
  }),
});

const updateProfileSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

export class UserController {
  static async getMe(req: Request, res: Response): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ message: 'Erro interno ao carregar perfil.' });
    }
  }

  static async updateRole(req: Request, res: Response): Promise<void> {
    const parsed = updateRoleSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.errors[0].message });
      return;
    }

    const { role } = parsed.data;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: req.user!.userId },
        data: { role },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      const token = jwt.sign(
        { userId: updatedUser.id, role: updatedUser.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        message: `Perfil alterado para ${updatedUser.role}.`,
        user: updatedUser,
        token,
      });
    } catch (error) {
      console.error('Erro ao alterar perfil:', error);
      res.status(500).json({ message: 'Erro interno ao atualizar perfil.' });
    }
  }

  static async updateProfile(req: Request, res: Response): Promise<void> {
    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.errors[0].message });
      return;
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: req.user!.userId },
        data: { name: parsed.data.name },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      res.status(200).json({
        message: 'Dados atualizados com sucesso!',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      res.status(500).json({ message: 'Erro interno ao atualizar dados.' });
    }
  }
}