const User = require("../model/user.js");
const Product = require("../model/product.js");

exports.addcart = async (req, res) => {
  const product = await Product.findOne({ id: req.body.id });
  if (!product) {
    return res.json({ error: "no product" });
  }

  const userEmail = req.body.email;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const existingCartItem = user.cart.find((item) => item.id === req.body.id);
  if (existingCartItem) {
    existingCartItem.quantity += 1;
    await Product.findOneAndUpdate(
      { id: req.body.id },
      { $inc: { quantity: -1 } }
    );
  } else {
    user.cart.push({ id: req.body.id, quantity: 1 });
  }

  await user.save();

  res.json({ message: "Product added to cart successfully", cart: user.cart });
};

exports.clearcart = async (req, res) => {
  const userEmail = req.body.email;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.json({ message: "no user" });
  }
  user.cart = [];
  await user.save();
  res.json({ message: "Cart clear", cart: user.cart });
};

exports.deletecart = async (req, res) => {
  const userEmail = req.body.email;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.json({ message: "no user" });
  }
  user.cart = user.cart.filter((item) => item.id !== req.body.id);
  await user.save();
  res.json({ message: "Item deleted", cart: user.cart });
};

exports.viewcart = async (req, res) => {
  const userEmail = req.body.email;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.json({ message: "no user" });
  }
  let total = 0;

  //not handling async , toh replacing map with for of /////
  ///  user.cart.map(async (item) => {
  for (const item of user.cart) {
    // console.log(item.quantity);
    const product = await Product.findOne({ id: item.id });
    if (product) {
      // console.log(product.price, item.quantity);
      total += item.quantity * product.price;
    }
  }

  res.json({ cart: user.cart, price: total });
};

module.exports = exports;
