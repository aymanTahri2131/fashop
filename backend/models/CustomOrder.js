import mongoose from 'mongoose';

const customOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  type: { type: String, required: true },
  description: { type: String, required: true },
  budget: Number,
  timeline: String,
  referenceUrl: String, // URL du fichier uploadé (cloud)
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CustomOrder', customOrderSchema);
