const Product = require("../model/product.js");

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

exports.getproduct = async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  if (!product) {
    return res.json({ error: "no product" });
  }
  res.json(product);
};

exports.deleteproduct = async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.params.id });
  if (!product) {
    return res.json({ error: "no product " });
  }
  res.json({ message: "Product deleted " });
};

exports.changeqty = async (req, res) => {
  const updatedProducts = req.body.products;

  updatedProducts.forEach(async (productData) => {
    const { id, quantity } = productData;
    await Product.updateOne({ id }, { quantity });
  });

  res.json({ message: "Product qty changed" });
};

module.exports = exports;
