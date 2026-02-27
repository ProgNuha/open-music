import express from 'express';
import { postLikeAlbumHandler, deleteLikeAlbumHandler, getAlbumLikesHandler } from '../controllers/likes-controller.js';
import authenticateToken from '../../../middlewares/authentication.js';

const router = express.Router();

router.post("/:id/likes", authenticateToken, postLikeAlbumHandler);
router.delete("/:id/likes", authenticateToken, deleteLikeAlbumHandler);
router.get("/:id/likes", getAlbumLikesHandler);

export default router;
