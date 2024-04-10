const User = require("../model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ManpreetEnactus";

exports.createuser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    let hashpw = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hashpw,
    });
    const token = jwt.sign({ email: req.body.email }, JWT_SECRET);
    return res.cookie("user", token, { httpOnly: true }).json("created");
  }
  res.json({ message: "already exist" });
};

exports.loginuser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    let validate = await bcrypt.compare(req.body.password, user.password);
    if (validate) {
      const token = jwt.sign({ email: req.body.email }, JWT_SECRET);
      return res.cookie("user", token, { httpOnly: true }).json("correct auth");
    } else {
      return res.json("wroong passwprd");
    }
  }
  res.json({ message: "no acc existts" });
};

module.exports = exports;
