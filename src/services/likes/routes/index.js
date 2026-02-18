import express from 'express';
import LikesController from '../controllers/likes-controller.js';
import authenticateToken from '../../../middlewares/authenticate.js';

const router = express.Router();
const likesController = new LikesController();

router.post(
  '/:id/likes',
  authenticateToken,
  (req, res, next) => likesController.postLikeAlbumHandler(req, res, next)
);

router.delete(
  '/:id/likes',
  authenticateToken,
  (req, res, next) => likesController.deleteLikeAlbumHandler(req, res, next)
);

router.get(
  '/:id/likes',
  (req, res, next) => likesController.getAlbumLikesHandler(req, res, next)
);

export default router;
