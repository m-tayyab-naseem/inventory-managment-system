const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product by modelNumber
exports.getProductByModelNumber = async (req, res) => {
  try {
    const product = await Product.findOne({ modelNumber: req.params.modelNumber });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by modelNumber
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { modelNumber: req.params.modelNumber },
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product by modelNumber
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ modelNumber: req.params.modelNumber });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully',product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
