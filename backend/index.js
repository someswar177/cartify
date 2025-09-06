const express = require("express");
const app = express();
const PORT = process.env.PORT || 8800;
require("dotenv").config();
const cors = require("cors");
const path = require('path');

app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(require('cookie-parser')());

const connectDB = require("./config/database");

app.get("/", (req, res) => res.json({ message: "Hello from ecommerce backend" }));

connectDB()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server start http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1);
  });
