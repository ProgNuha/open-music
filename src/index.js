import server from './server/index.js';
import CacheService from './services/redis/CacheService.js'; // ← NEW import
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
const host = process.env.HOST || 'localhost';
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

const cacheService = new CacheService();
await cacheService.connect();

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});