import 'dotenv/config';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from './config/dbConn';
import rootRoute from './routes/root';
// import registerRoute from './routes/register';
// import authRoute from './routes/auth';
// import refreshRoute from './routes/refresh';
// import logoutRoute from './routes/logout';
import employeesRoute from './routes/api/employees';
import userRoute from './controllers/users/routes';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions';

import { reqLogger } from './middleware/logEvents';
import credentials from './middleware/credentials';
import verifyJWT from './middleware/verifyJWT';
import errorHandler from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(reqLogger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use(cookieParser());

// Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', rootRoute);
app.use('/user', userRoute);
// app.use('/register', registerRoute);
// app.use('/auth', authRoute);
// app.use('/refresh', refreshRoute);
// app.use('/logout', logoutRoute);

app.use(verifyJWT);
app.use('/employees', employeesRoute);

// Handle not found
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ err: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
