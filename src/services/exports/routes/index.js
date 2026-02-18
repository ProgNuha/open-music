import express from 'express';
import { postExportPlaylistHandler } from '../controllers/export-controller.js';
import { ExportPlaylistPayloadSchema } from '../validator/schema.js';
import validate from '../../../utils/validator.js';
import authenticateToken from "../../../middlewares/authentication.js";

const router = express.Router();

router.post(
  "/playlists/:playlistId",
  authenticateToken,
  validate(ExportPlaylistPayloadSchema),
  postExportPlaylistHandler
);

export default router;
