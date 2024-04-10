const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");

const authadmin = async (req, res, next) => {
  await mongoose.connection.ready;
  const token = req.cookies.admin;
  if (!token) {
    return res.json({ message: "Unauth admin" });
  }

  const decoded = jwt.verify(token, "ManpreetEnactus");
  if (!decoded) {
    return res.json({ message: "Unauth admi" });
  }

  const admin = await Admin.findOne({ email: decoded.email });
  if (!admin) {
    return res.json({ message: "unauth" });
  }

  req.admin = admin;
  next();
};

module.exports = authadmin;
