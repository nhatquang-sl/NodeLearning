import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  }
});

export default mongoose.model('Employee', employeeSchema);
