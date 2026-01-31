import server from './server/index.js';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
const host = process.env.HOST || 'localhost';
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});