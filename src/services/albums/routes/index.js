import express from "express";
import { createAlbum, getAlbums, getAlbumById, editAlbumById, deleteAlbumById } from "../controllers/album-controller.js";
import validate from "../../../middlewares/validate.js";
import { albumPayloadSchema, albumUpdatePayloadSchema, albumQuerySchema } from "../../../services/albums/validator/schema.js";
import authenticateToken from '../../../middlewares/authentication.js';

const router = express.Router();

router.post("/", authenticateToken, validate(albumPayloadSchema), createAlbum);
router.get("/", authenticateToken, validate(albumQuerySchema), getAlbums);
router.get("/:id", authenticateToken, getAlbumById);
router.put("/:id", authenticateToken, validate(albumUpdatePayloadSchema), editAlbumById);
router.delete("/:id", authenticateToken, deleteAlbumById);

export default router;
