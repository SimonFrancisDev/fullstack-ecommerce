const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    descriptions: String,
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        enum: ["clothings","accessories","Health & Beauty","Fitness","Sports"],
        default: "others"
    },
    stock: {
        type: Number,
        default: 0
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema)