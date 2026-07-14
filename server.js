const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const contentType = ext === '.html' ? 'text/html' : 'text/plain';
      res.writeHead(200, { 'Content-Type': contentType + ';charset=utf-8' });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  } catch (e) {
    res.writeHead(500);
    res.end('Error');
  }
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
  console.log('Admin: http://localhost:8080/admin.html');
});
