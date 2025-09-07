// controllers/productController.js
const Product = require('../models/Product');
const axios = require('axios');
require('dotenv').config();

const FAKESTORE = process.env.FAKESTORE_API || 'https://fakestoreapi.com';

// GET /api/product - supports queries category, minPrice, maxPrice, q, sort, limit, skip
const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, q, sort, limit = 20, skip = 0 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (q) query.title = { $regex: q, $options: 'i' };

    let cursor = Product.find(query).skip(Number(skip)).limit(Number(limit));
    if (sort === 'price_asc') cursor = cursor.sort({ price: 1 });
    else if (sort === 'price_desc') cursor = cursor.sort({ price: -1 });
    else if (sort === 'latest') cursor = cursor.sort({ createdAt: -1 });

    const products = await cursor.exec();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await Product.findOne({ productId: id });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

const getCategories = async (req, res) => {
  try {
    // if categories saved in DB you can fetch distinct; else call FakeStoreAPI
    const categories = await Product.distinct('category');
    if (categories && categories.length) return res.json(categories);

    // fallback to FakeStoreAPI
    const { data } = await axios.get(`${FAKESTORE}/products/categories`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// Optional: endpoint to trigger a seed (calls utils/seedFakeStore)
const seedProducts = async (req, res) => {
  try {
    // naive: call fake store and insert if not exists
    const { data } = await axios.get(`${FAKESTORE}/products`);
    for (const p of data) {
      const exists = await Product.findOne({ productId: p.id });
      if (!exists) {
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
      }
    }
    res.json({ message: 'Seed complete' });
  } catch (err) {
    res.status(500).json({ message: 'Seed failed' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  seedProducts
};
