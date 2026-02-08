import express from "express";
import {addCollaboration, deleteCollaboration} from "../controllers/collaborations-controller.js";
import authenticateToken from "../../../middlewares/authentication.js";
import { CollaborationPayloadSchema } from "../validator/schema.js";
import validate from "../../../middlewares/validate.js";

const router = express.Router();

router.post("/", authenticateToken, validate(CollaborationPayloadSchema), addCollaboration);
router.delete("/", authenticateToken, validate(CollaborationPayloadSchema), deleteCollaboration);

export default router;
