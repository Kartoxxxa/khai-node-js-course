// product.router.js

const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
    return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
    const { brand } = request.params; // Access the brand parameter from the URL

    // Filter products based on the brand parameter
    const filteredProducts = products.filter(product => product.brand === brand);

    response.json(filteredProducts); // Send the filtered products as a JSON response
});

// handle get request for path /products/id/:id
router.get('/products/id/:id', (request, response) => {
    const { id } = request.params; // Access the id parameter from the URL

    // Filter products based on the id parameter
    const filteredProducts = products.filter(product => product.id === parseInt(id));

    if (filteredProducts.length === 0) {
        // If no products are found, send a 404 Not Found response
        return response.status(404).json({ error: 'No products found for the given id' });
    }

    response.json(filteredProducts); // Send the filtered products as a JSON response
});

module.exports = router;
