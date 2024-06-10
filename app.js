const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Product = require('./models/Product');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

app.get('/product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('product', { product });
});

// Route to render the form for uploading a product
app.get('/upload', (req, res) => {
    res.render('upload');
});

// Route to handle the form submission and save the uploaded product to the database
app.post('/upload', async (req, res) => {
    const { name, price, description, imageUrl, men, women, kids } = req.body;

    try {
        // Create a new product instance
        const product = new Product({
            name,
            price,
            description,
            imageUrl,
            men: men === 'on', // Convert checkbox value to boolean
            women: women === 'on',
            kids: kids === 'on'
        });

        // Save the product to the database
        await product.save();

        // Redirect to the home page or show a success message
        res.redirect('/');
    } catch (error) {
        // Handle errors (e.g., validation errors)
        console.error(error);
        res.status(500).send('Error saving product: ' + error.message);
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
