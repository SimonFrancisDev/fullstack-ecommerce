import express from 'express';
import Product from '../models/productModel.js';
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { addProduct, getProduct } from '../controllers/prodCtrl.js';

// configure express
const router = express.Router();

// routes for creating products in the database
// admins only
router.post("/", protect, adminOnly, addProduct);



// routes for accessing products listings
router.get("/", protect,  getProduct);