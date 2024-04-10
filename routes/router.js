const express = require("express");
const router = express.Router();
const productController = require("../controller/controller");

// Create a new product
router.post("/products", productController.createProduct);

// Get all products
router.get("/products", productController.getAllProducts);

// Get product by ID
router.get("/products/:id", productController.getProductById);

// Update product by ID
router.put("/products/:id", productController.updateProductById);

// Delete product by ID
router.delete("/products/:id", productController.deleteProductById);

module.exports = router;
