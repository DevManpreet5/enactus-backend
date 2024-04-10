//task1
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  composition: {
    type: String,
  },
  specification: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const Productmodel = mongoose.model("Product", productSchema);

module.exports = Productmodel;
