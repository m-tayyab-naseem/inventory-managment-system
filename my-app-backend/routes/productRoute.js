const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes for products
router.post('/create', productController.createProduct); // Create a new product
router.get('/', productController.getAllProducts); // Get all products
router.get('/:modelNumber', productController.getProductByModelNumber); // Get a product by modelNumber
router.put('/:modelNumber', productController.updateProduct); // Update a product by modelNumber
router.delete('/:modelNumber', productController.deleteProduct); // Delete a product by modelNumber

module.exports = router;
