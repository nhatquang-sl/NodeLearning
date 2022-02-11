import allowedOrigins from './allowedOrigins';

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Now allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

export default corsOptions;