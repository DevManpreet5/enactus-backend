const Coupon = require("../model/coupon");

async function createCoupon(req, res) {
  try {
    const { coupon, discount } = req.body;

    const existingCoupon = await Coupon.findOne({ coupon });
    if (existingCoupon) {
      return res.json({ error: "code already" });
    }

    const newCoupon = new Coupon({
      coupon,
      discount,
    });

    await newCoupon.save();

    res.json({ message: "Coupon created successfully" });
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
}

async function deleteCoupon(req, res) {
  try {
    const { coupon } = req.params;

    await Coupon.deleteOne({ coupon });

    res.json({ message: "Coupon deleted " });
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
}

module.exports = {
  createCoupon,
  deleteCoupon,
};
