import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  id: Number,
  name: String,
  lastName: {
    type: String,
    required: true,
  },
  isActive: Boolean,
});

export default mongoose.model('Users', userSchema);
