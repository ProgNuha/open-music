import express from "express";
import { createAlbum, getAlbums, getAlbumById, editAlbumById, deleteAlbumById } from "../controllers/album-controller.js";
import validate from "../../../middlewares/validate.js";
import { albumPayloadSchema, albumUpdatePayloadSchema, albumQuerySchema } from "../../../services/albums/validator/schema.js";

const router = express.Router();

router.post("/albums", validate(albumPayloadSchema), createAlbum);
router.get("/albums", validate(albumQuerySchema), getAlbums);
router.get("/albums/:id", getAlbumById);
router.put("/albums/:id", validate(albumUpdatePayloadSchema), editAlbumById);
router.delete("/albums/:id", deleteAlbumById);

export default router;
