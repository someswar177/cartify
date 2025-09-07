// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
  wishlist: [{ type: Number }], // store productId from FakeStoreAPI
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
