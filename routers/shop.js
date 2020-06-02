const express = require('express');
const router = express.Router();
const productController = require('../controller/products');
const cartController = require('../controller/cart');

router.get('/', productController.getGetAllProduct);
router.get('/cart', cartController.getCart);
router.get('/check-out', cartController.getCheckOut);
router.post('/check-out', cartController.checkout);
router.get('/add-to-cart', cartController.addToCart);
router.get('/search', productController.getProductByName);

module.exports = router;