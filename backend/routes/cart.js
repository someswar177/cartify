const express = require('express');
const router = express.Router();
const { validateToken } = require('../middleware/token');
const cartController = require('../controllers/cartController');

router.get('/', validateToken, cartController.getCart);
router.post('/', validateToken, cartController.addToCart);
router.put('/', validateToken, cartController.updateCart);
router.delete('/:productId', validateToken, cartController.removeFromCart);
router.delete('/', validateToken, cartController.emptyCart);

module.exports = router;
