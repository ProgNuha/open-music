import { Router } from 'express';
import albums from '../services/albums/routes/index.js';
import songs from '../services/songs/routes/index.js';
import users from '../services/users/routes/index.js';
 
const router = Router();
 
router.use('/albums', albums);
router.use('/songs', songs);
router.use('/users', users);

export default router;