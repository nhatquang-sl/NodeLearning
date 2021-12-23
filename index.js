const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./src/logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url === '/' || req.url === 'index.html') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    let filePath = path.join(__dirname, 'src', 'views', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      res.end(data);
    });
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 