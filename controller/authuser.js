const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Admin = require("../model/admin");

const auth = async (req, res, next) => {
  const userToken = req.cookies.user;
  const adminToken = req.cookies.admin;

  if (userToken) {
    const decodedUser = jwt.verify(userToken, "ManpreetEnactus");
    if (!decodedUser) {
      return res.json({ message: "Unauth" });
    }
    const user = await User.findOne({ email: decodedUser.email });
    if (!user) {
      return res.json({ message: "Unauth" });
    }
    req.user = user;
  }

  if (adminToken) {
    const decodedAdmin = jwt.verify(adminToken, "ManpreetEnactus");
    if (!decodedAdmin) {
      return res.json({ message: "Unauth" });
    }
    const admin = await Admin.findOne({ email: decodedAdmin.email });
    if (!admin) {
      return res.json({ message: "Unauth" });
    }
    req.admin = admin;
  }

  next();
};

module.exports = auth;
