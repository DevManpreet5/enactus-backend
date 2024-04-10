//task1
const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  cart: [
    {
      id: {
        type: Number,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const usermodel = mongoose.model("user", userschema);

module.exports = usermodel;
