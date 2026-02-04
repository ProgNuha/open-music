import express from 'express';
import UserController from '../controllers/user-controller.js';

const router = express.Router();

router.post('/', UserController.addUser);
router.get('/:id', UserController.getUserById);

export default router;