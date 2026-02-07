import express from "express";
import {
  addPlaylist,
  getPlaylists,
  deletePlaylistById,
  addSongToPlaylist,
  getSongsFromPlaylist,
  deleteSongFromPlaylist,
  getPlaylistActivities
} from "../controllers/playlist-controller.js";
import authenticateToken from "../../../middlewares/authentication.js";
import validate from "../../../middlewares/validate.js";
import {
  PostPlaylistPayloadSchema,
  PostPlaylistSongPayloadSchema,
} from "../validator/schema.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  validate(PostPlaylistPayloadSchema),
  addPlaylist,
);
router.get("/", authenticateToken, getPlaylists);
router.delete("/:id", authenticateToken, deletePlaylistById);
router.post(
  "/:id/songs",
  authenticateToken,
  validate(PostPlaylistSongPayloadSchema),
  addSongToPlaylist,
);
router.get("/:id/songs", authenticateToken, getSongsFromPlaylist);
router.delete(
  "/:id/songs",
  authenticateToken,
  validate(PostPlaylistSongPayloadSchema),
  deleteSongFromPlaylist,
);
router.get(
  "/:id/activities",
  authenticateToken,
  getPlaylistActivities,
);

export default router;
