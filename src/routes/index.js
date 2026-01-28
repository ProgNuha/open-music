import { Router } from 'express';
import albums from '../services/albums/routes/index.js';
 
const router = Router();
 
router.use('/', albums);

export default router;