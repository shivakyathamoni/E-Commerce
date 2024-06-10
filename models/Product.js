const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    men: {
        type: Boolean,
        default: false // Default value is false
    },
    women: {
        type: Boolean,
        default: false // Default value is false
    },
    kids: {
        type: Boolean,
        default: false // Default value is false
    }
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
