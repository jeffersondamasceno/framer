import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

type Role = 'comprador' | 'artista';

const signUpSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

const loginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido.'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório.'),
  newPassword: z.string().min(6, 'A nova senha deve ter no mínimo 6 caracteres.'),
});

function generateToken(userId: string, role: Role) {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign({ userId, role }, secret, { expiresIn: '7d' });
}

export class AuthController {
  static async signUp(req: Request, res: Response): Promise<void> {
    const parsed = signUpSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.errors[0].message });
      return;
    }

    const { name, email, password } = parsed.data;

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: 'comprador',
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      const token = generateToken(user.id, user.role as Role);

      res.status(201).json({
        message: 'Conta criada com sucesso!',
        user,
        token,
      });
    } catch (error) {
      console.error('Erro no cadastro:', error);
      res.status(500).json({ message: 'Erro interno ao criar conta.' });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.errors[0].message });
      return;
    }

    const { email, password } = parsed.data;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        return;
      }

      const token = generateToken(user.id, user.role as Role);

      res.status(200).json({
        message: 'Sessão iniciada com sucesso!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ message: 'Erro interno ao realizar login.' });
    }
  }

  static async forgotPassword(req: Request, res: Response): Promise<void> {
    const parsed = forgotPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.errors[0].message });
      return;
    }

    const { email } = parsed.data;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(200).json({
          message: 'Se o e-mail estiver cadastrado, enviaremos instruções de recuperação.',
        });
        return;
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000);

      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry },
      });

      console.log(`[DEBUG] Link de recuperação: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`);

      res.status(200).json({
        message: 'Se o e-mail estiver cadastrado, enviaremos instruções de recuperação.',
      });
    } catch (error) {
      console.error('Erro ao solicitar recuperação:', error);
      res.status(500).json({ message: 'Erro interno ao processar solicitação.' });
    }
  }

  static async resetPassword(req: Request, res: Response): Promise<void> {
    const parsed = resetPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.errors[0].message });
      return;
    }

    const { token, newPassword } = parsed.data;

    try {
      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: { gt: new Date() },
        },
      });

      if (!user) {
        res.status(400).json({ message: 'Token inválido ou expirado.' });
        return;
      }

      const passwordHash = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });

      res.status(200).json({ message: 'Senha redefinida com sucesso!' });
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      res.status(500).json({ message: 'Erro interno ao redefinir senha.' });
    }
  }
}