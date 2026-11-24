import { z } from 'zod';

export const creativeStepSchema = z.object({
  title: z.string().min(2, 'O título da etapa deve ter pelo menos 2 caracteres.'),
  description: z.string().min(5, 'A descrição da etapa é obrigatória.'),
  type: z.enum(['sketch', 'wip', 'video']),
  mediaUrl: z.string().url('URL de mídia inválida.'),
  timestamp: z.string().min(1, 'O registro de data/hora da etapa é obrigatório.'),
  order: z.number().int().nonnegative().optional(),
});

export const createArtworkSchema = z.object({
  title: z.string().min(2, 'O título da obra deve ter pelo menos 2 caracteres.'),
  description: z.string().min(10, 'Forneça uma descrição detalhada da obra.'),
  category: z.string().min(2, 'A categoria é obrigatória.'),
  technique: z.string().min(2, 'A técnica utilizada é obrigatória.'),
  dimensions: z.string().min(2, 'As dimensões são obrigatórias.'),
  price: z.number().positive('O preço deve ser maior que zero.'),
  imageUrl: z.string().url('URL da imagem principal inválida.'),
  creativeProcess: z.array(creativeStepSchema).optional().default([]),
});

export const updateArtworkSchema = createArtworkSchema.partial().extend({
  isAvailable: z.boolean().optional(),
});

export const listArtworksQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  onlyDocumentedProcess: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
});