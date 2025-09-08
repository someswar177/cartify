const express = require("express");
const app = express();
const PORT = process.env.PORT || 8800;
require("dotenv").config();
const cors = require("cors");
const path = require('path');

app.use(
  cors({
    origin: [
      /^http:\/\/localhost:\d+$/,
      "http://localhost:5173",
      "https://cartify-project-hazel.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(require('cookie-parser')());

const connectDB = require("./config/database");
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

app.get("/", (req, res) => res.json({ message: "Hello from ecommerce backend" }));

connectDB()
  .then(async () => {
    // const seed = require('./utils/seedFakeStore');
    // await seed(); // if implemented to export function
    app.listen(PORT, () => {
      console.log(`Server start http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1);
  });
