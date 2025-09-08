const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id, title, price, image, quantity = 1 } = req.body;
    const productId = Number(id);

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = await Cart.create({ userId, items: [] });

    const idx = cart.items.findIndex(item => item.productId === productId);
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ productId, title, price, image, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id, quantity } = req.body;
    const productId = Number(id);

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const idx = cart.items.findIndex(i => i.productId === productId);
    if (idx === -1) return res.status(404).json({ message: 'Item not in cart' });

    cart.items[idx].quantity = Number(quantity);
    if (cart.items[idx].quantity <= 0) {
      cart.items.splice(idx, 1);
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update cart' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = Number(req.params.productId);

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(i => i.productId !== productId);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove item' });
  }
};

const emptyCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndUpdate({ userId }, { items: [] }, { upsert: true });
    res.json({ message: 'Cart emptied' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to empty cart' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  emptyCart
};