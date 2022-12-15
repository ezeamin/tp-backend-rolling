import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  image: String,
  description: String,
});

export default mongoose.model('Products', productSchema);
