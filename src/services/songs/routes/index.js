import express from "express";
import { createSong, getSongs, getSongById, editSongById, deleteSongById } from "../controllers/song-controller.js";
import validate from "../../../middlewares/validate.js";
import { songPayloadSchema, songQuerySchema, songUpdatePayloadSchema } from "../validator/schema.js";

const router = express.Router();

router.post("/", validate(songPayloadSchema), createSong);
router.get("/", validate(songQuerySchema), getSongs);
router.get("/:id", getSongById);
router.put("/:id", validate(songUpdatePayloadSchema), editSongById);
router.delete("/:id", deleteSongById);

export default router;