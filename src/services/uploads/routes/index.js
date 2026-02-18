import express from "express";
import upload from "../../../middlewares/upload.js";
import { postUploadCoverHandler } from "../controllers/uploads-controller.js";
// import { ImageHeadersSchema } from "../validator/schema.js";

const router = express.Router();

router.post("/:id/covers", upload.single('cover'), postUploadCoverHandler);

export default router;
