import { Router } from 'express';
import { ArtworkController } from '../controllers/artwork.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireArtistRole } from '../middlewares/role.middleware';

const artworkRoutes = Router();
const artworkController = new ArtworkController();

artworkRoutes.get('/', artworkController.list);
artworkRoutes.get('/:id', artworkController.getById);

artworkRoutes.get(
  '/artist/me',
  authMiddleware,
  requireArtistRole,
  artworkController.listMyArtworks
);

artworkRoutes.post(
  '/',
  authMiddleware,
  requireArtistRole,
  artworkController.create
);

artworkRoutes.patch(
  '/:id',
  authMiddleware,
  requireArtistRole,
  artworkController.update
);

artworkRoutes.post(
  '/:id/steps',
  authMiddleware,
  requireArtistRole,
  artworkController.addProcessStep
);

artworkRoutes.delete(
  '/:id',
  authMiddleware,
  requireArtistRole,
  artworkController.delete
);

export { artworkRoutes };