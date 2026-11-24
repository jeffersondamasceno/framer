import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import {
  createArtworkSchema,
  listArtworksQuerySchema,
  updateArtworkSchema,
  creativeStepSchema,
} from '../schemas/artwork.schema';
import { ZodError } from 'zod';

function formatArtworkResponse(artwork: any) {
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    artwork.artist.name
  )}&background=random`;

  const generatedHandle =
    artwork.artist.handle ||
    `@${artwork.artist.name.toLowerCase().replace(/\s+/g, '')}`;

  return {
    id: artwork.id,
    title: artwork.title,
    description: artwork.description,
    category: artwork.category,
    technique: artwork.technique,
    dimensions: artwork.dimensions,
    price: artwork.price,
    imageUrl: artwork.imageUrl,
    isAvailable: artwork.isAvailable,
    artistId: artwork.artist.id,
    artistName: artwork.artist.name,
    artistAvatar: artwork.artist.avatarUrl || defaultAvatar,
    artistHandle: generatedHandle,
    hasDocumentedProcess: artwork.creativeProcess.length > 0,
    creativeProcess: artwork.creativeProcess,
    createdAt: artwork.createdAt,
  };
}

export class ArtworkController {
  async list(req: Request, res: Response) {
    try {
      const { search, category, maxPrice, onlyDocumentedProcess } =
        listArtworksQuerySchema.parse(req.query);

      const where: any = {
        isAvailable: true,
      };

      if (category && category !== 'Todas') {
        where.category = category;
      }

      if (maxPrice !== undefined) {
        where.price = { lte: maxPrice };
      }

      if (onlyDocumentedProcess) {
        where.creativeProcess = {
          some: {},
        };
      }

      if (search && search.trim() !== '') {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { technique: { contains: search, mode: 'insensitive' } },
          { artist: { name: { contains: search, mode: 'insensitive' } } },
        ];
      }

      const artworks = await prisma.artwork.findMany({
        where,
        include: {
          artist: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              handle: true,
            },
          },
          creativeProcess: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return res.json({
        artworks: artworks.map(formatArtworkResponse),
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Parâmetros de filtro inválidos.', errors: error.errors });
      }
      return res.status(500).json({ message: 'Erro ao listar obras.' });
    }
  }

  async listMyArtworks(req: Request, res: Response) {
    try {
      const artistId = req.user!.userId;

      const artworks = await prisma.artwork.findMany({
        where: { artistId },
        include: {
          artist: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              handle: true,
            },
          },
          creativeProcess: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return res.json({
        artworks: artworks.map(formatArtworkResponse),
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar suas obras.' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const artwork = await prisma.artwork.findUnique({
        where: { id },
        include: {
          artist: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              handle: true,
            },
          },
          creativeProcess: {
            orderBy: { order: 'asc' },
          },
        },
      });

      if (!artwork) {
        return res.status(404).json({ message: 'Obra não encontrada.' });
      }

      return res.json({ artwork: formatArtworkResponse(artwork) });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar detalhes da obra.' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const artistId = req.user!.userId;
      const data = createArtworkSchema.parse(req.body);

      const artwork = await prisma.artwork.create({
        data: {
          title: data.title,
          description: data.description,
          category: data.category,
          technique: data.technique,
          dimensions: data.dimensions,
          price: data.price,
          imageUrl: data.imageUrl,
          artistId,
          creativeProcess: {
            create: data.creativeProcess.map((step, idx) => ({
              title: step.title,
              description: step.description,
              type: step.type,
              mediaUrl: step.mediaUrl,
              timestamp: step.timestamp,
              order: step.order ?? idx,
            })),
          },
        },
        include: {
          artist: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              handle: true,
            },
          },
          creativeProcess: {
            orderBy: { order: 'asc' },
          },
        },
      });

      return res.status(201).json({
        message: 'Obra publicada com sucesso!',
        artwork: formatArtworkResponse(artwork),
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: 'Dados inválidos.', errors: error.errors });
      }
      return res.status(500).json({ message: 'Erro ao cadastrar obra.' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const artistId = req.user!.userId;
      const data = updateArtworkSchema.parse(req.body);

      const existingArtwork = await prisma.artwork.findUnique({ where: { id } });

      if (!existingArtwork) {
        return res.status(404).json({ message: 'Obra não encontrada.' });
      }

      if (existingArtwork.artistId !== artistId) {
        return res.status(403).json({ message: 'Você só pode editar suas próprias obras.' });
      }

      const updatedArtwork = await prisma.$transaction(async (tx) => {
        if (data.creativeProcess) {
          await tx.creativeProcessStep.deleteMany({ where: { artworkId: id } });
        }

        return tx.artwork.update({
          where: { id },
          data: {
            title: data.title,
            description: data.description,
            category: data.category,
            technique: data.technique,
            dimensions: data.dimensions,
            price: data.price,
            imageUrl: data.imageUrl,
            isAvailable: data.isAvailable,
            ...(data.creativeProcess && {
              creativeProcess: {
                create: data.creativeProcess.map((step, idx) => ({
                  title: step.title,
                  description: step.description,
                  type: step.type,
                  mediaUrl: step.mediaUrl,
                  timestamp: step.timestamp,
                  order: step.order ?? idx,
                })),
              },
            }),
          },
          include: {
            artist: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
                handle: true,
              },
            },
            creativeProcess: {
              orderBy: { order: 'asc' },
            },
          },
        });
      });

      return res.json({
        message: 'Obra atualizada com sucesso!',
        artwork: formatArtworkResponse(updatedArtwork),
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: 'Dados inválidos.', errors: error.errors });
      }
      return res.status(500).json({ message: 'Erro ao atualizar obra.' });
    }
  }

  async addProcessStep(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const artistId = req.user!.userId;
      const stepData = creativeStepSchema.parse(req.body);

      const artwork = await prisma.artwork.findUnique({
        where: { id },
      });

      if (!artwork) {
        return res.status(404).json({ message: 'Obra não encontrada.' });
      }

      if (artwork.artistId !== artistId) {
        return res.status(403).json({ message: 'Permissão negada para esta obra.' });
      }

      const currentStepsCount = await prisma.creativeProcessStep.count({
        where: { artworkId: id },
      });

      const step = await prisma.creativeProcessStep.create({
        data: {
          title: stepData.title,
          description: stepData.description,
          type: stepData.type,
          mediaUrl: stepData.mediaUrl,
          timestamp: stepData.timestamp,
          order: stepData.order ?? currentStepsCount,
          artworkId: id,
        },
      });

      return res.status(201).json({
        message: 'Etapa do processo criativo adicionada!',
        step,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Dados da etapa inválidos.', errors: error.errors });
      }
      return res.status(500).json({ message: 'Erro ao adicionar etapa.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const artistId = req.user!.userId;

      const existingArtwork = await prisma.artwork.findUnique({ where: { id } });

      if (!existingArtwork) {
        return res.status(404).json({ message: 'Obra não encontrada.' });
      }

      if (existingArtwork.artistId !== artistId) {
        return res.status(403).json({ message: 'Você só pode remover suas próprias obras.' });
      }

      await prisma.artwork.delete({ where: { id } });

      return res.json({ message: 'Obra removida com sucesso.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao remover obra.' });
    }
  }
}