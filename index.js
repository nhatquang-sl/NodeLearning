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

  const extension = path.extname(req.url);

  let contentType;
  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  let filePath = path.join(__dirname, 'src', req.url);
  if (contentType === 'text/html') {
    filePath =
      req.url === '/'
        ? path.join(__dirname, 'src', 'views', 'index.html')
        : req.url.slice(-1) === '/'
        ? path.join(__dirname, 'src', 'views', req.url, 'index.html')
        : path.join(__dirname, 'src', 'views', req.url);
  }

  // make .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    // serve the file
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case 'old-page.html': // 301 redirect
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;
      case 'www-page.html': // 301 redirect
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        // 404 not found
        serveFile(path.join(__dirname, 'src', 'views', '404.html'), 'text/html', res);
        break;
    }
    console.log(path.parse(filePath));
  }
});

const serveFile = async (filePath, contentType, response) => {
  try {
    const data = await fsPromises.readFile(filePath, 'utf8');
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
  } catch (err) {
    console.log(err);
    response.statusCode = 500;
    response.end();
  }
};

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
