const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  coupon: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
