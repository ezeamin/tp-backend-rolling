import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  price: Number,
  image: String,
  description: String,
});

export default mongoose.model('Products', productSchema);
