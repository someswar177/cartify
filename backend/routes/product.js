const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/seed', productController.seedProducts); // optional seed endpoint
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProductById);

module.exports = router;
