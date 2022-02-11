import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  roles: [String],
  password: {
    type: String,
    required: true
  },
  refreshToken: String
});

export default mongoose.model('User', userSchema);
