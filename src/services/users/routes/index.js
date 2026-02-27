import express from 'express';
import {addUser, getUserById} from '../controllers/user-controller.js';
import validate from '../../../middlewares/validate.js';
import { UserPayloadSchema } from '../validator/schema.js';  

const router = express.Router();

router.post('/', validate(UserPayloadSchema), addUser);  
router.get('/:id', getUserById);

export default router;