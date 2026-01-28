import express from "express";
import {create} from "../controllers/album-controller.js";
import validate from '../../../middlewares/validate.js';
import { albumPayloadSchema } from '../../../services/albums/validator/schema.js';

const router = express.Router();

router.post('/albums', validate(albumPayloadSchema), create);

export default router;
