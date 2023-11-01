import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  'image-url': {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isActive: Boolean,
});

export default mongoose.model('Blogs', blogSchema);
