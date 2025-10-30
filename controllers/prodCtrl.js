import express from 'express';
import Product from "../models/productModel";


module.exports = async function addProduct(req, res, next) {
    try {
        // get the data from the frontend using axios
        const { name, description, price, category, stock, image } = req.body;

        // // validate data from the frontned
        if (!name || !description || !price || !category || !stock || !image) {
            return res.status(401).json({Message: "Expecting one atleast of the product data"})
        }
        
        // create a new product in the database
        const product = new Product({
            name, description, price, category, stock, image, createdBy: req.user.id
        })

         await product.save();
         res.status(201).json({message: "Attention: Product added to the database"})
    } catch(err) {
        next(err)
    }
}



// controller to fetch all products

module.exports = async function getProduct(req, res, next) {
    try {
        const products = await Product.find().sort({ createdAt: -1});
        res.json(products)
    } catch(err) {
        next(err)
    } 
}
