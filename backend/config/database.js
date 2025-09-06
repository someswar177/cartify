const mongoose = require("mongoose");
require('dotenv').config();

const DATABASE = process.env.DATABASE;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE, {
      // options if needed
    });
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
