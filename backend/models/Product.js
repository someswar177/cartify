const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  rate: Number,
  count: Number
}, { _id: false });

const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: ratingSchema,
  stock: { type: Number, default: 50 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
