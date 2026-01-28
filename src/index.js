import server from './server/index.js';
 
const host = 'localhost';
const port = 3000;
 
server.listen(port, () => {
 console.log(`Server running at http://${host}:${port}`);
});