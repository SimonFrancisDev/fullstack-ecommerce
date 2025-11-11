const Product = require("../models/productModel");

// Controller to add a new product (Admin only)
const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !stock || !image) {
      return res.status(400).json({ message: "Expecting all product data fields" });
    }

    // Create a new product
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
      createdBy: req.user.id, // set by auth middleware
    });

    await product.save();
    res.status(201).json({ message: "Attention: Product added to the database", product });
  } catch (err) {
    next(err);
  }
};

// Controller to fetch all products (Protected)
const getProduct = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Export controllers as CommonJS
module.exports = { addProduct, getProduct };
