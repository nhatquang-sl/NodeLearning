const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { reqLogger } = require('./src/middleware/logEvents');
const errorHandler = require('./src/middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(reqLogger);

// Cross Origin Resource Sharing
const whitelist = ['http://127.0.0.1:3500', 'http://localhost:3500'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Now allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, 'src', 'public')));
app.use('/subdir', express.static(path.join(__dirname, 'src', 'public')));

app.use('/', require('./src/routes/root'));
app.use('/subdir', require('./src/routes/subdir'));
app.use('/employees', require('./src/routes/api/employees'));

// app.all accept all HTTP verbs
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'src', 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    req.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
