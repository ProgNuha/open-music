import express from "express";
import { createAlbum, getAlbums, getAlbumById, editAlbumById, deleteAlbumById } from "../controllers/album-controller.js";
import validate from "../../../middlewares/validate.js";
import { albumPayloadSchema, albumUpdatePayloadSchema, albumQuerySchema } from "../../../services/albums/validator/schema.js";

const router = express.Router();

router.post("/", validate(albumPayloadSchema), createAlbum);
router.get("/", validate(albumQuerySchema), getAlbums);
router.get("/:id", getAlbumById);
router.put("/:id", validate(albumUpdatePayloadSchema), editAlbumById);
router.delete("/:id", deleteAlbumById);

export default router;
