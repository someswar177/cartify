require('dotenv').config();
const axios = require('axios');
const connectDB = require('../config/database');
const Product = require('../models/Product');

const FAKESTORE = process.env.FAKESTORE_API || 'https://fakestoreapi.com';

async function seed() {
  await connectDB();

  try {
    const { data } = await axios.get(`${FAKESTORE}/products`);
    for (const p of data) {
      const existing = await Product.findOne({ productId: p.id });
      if (!existing) {
        await Product.create({
          productId: p.id,
          title: p.title,
          price: p.price,
          description: p.description,
          category: p.category,
          image: p.image,
          rating: p.rating || { rate: 0, count: 0 },
          stock: Math.floor(Math.random() * 100) + 1
        });
        console.log(`Inserted product ${p.title}`);
      }
    }
    console.log('Seeding completed');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err.message);
    process.exit(1);
  }
}

seed();
