import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  try {
    const dataUri: string = process.env.DATABASE_URI as string;
    await mongoose.connect(dataUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    } as ConnectOptions);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
