const express = require("express");
const Product = require("../models/productModel");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { addProduct, getProduct } = require("../controllers/prodCtrl");

const router = express.Router();

// Admin adds product
router.post("/", protect, adminOnly, addProduct);

// Users view products
router.get("/", protect, getProduct);

module.exports = router;
