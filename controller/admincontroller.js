const Admin = require("../model/admin");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ManpreetEnactus";

exports.createadmin = async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    let hashpw = await bcrypt.hash(req.body.password, 10);
    await Admin.create({
      email: req.body.email,
      password: hashpw,
    });
    const token = jwt.sign({ email: req.body.email }, JWT_SECRET);
    return res.cookie("admin", token, { httpOnly: true }).json("created");
  }
  res.json({ message: "already exist" });
};

exports.loginadmin = async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (admin) {
    let validate = await bcrypt.compare(req.body.password, admin.password);
    if (validate) {
      const token = jwt.sign({ email: req.body.email }, JWT_SECRET);
      return res
        .cookie("admin", token, { httpOnly: true })
        .json("correct auth");
    } else {
      return res.json("wroong passwprd");
    }
  }
  res.json({ message: "no acc existts" });
};

exports.getusers = async (req, res) => {
  const users = await User.find().select("email");
  if (!users) {
    return res.json({ error: "no user" });
  }
  res.json(users);
};

exports.getuserinfo = async (req, res) => {
  const users = await User.findOne({ email: req.params.email });
  if (!users) {
    return res.json({ error: "no user" });
  }
  res.json(users);
};

module.exports = exports;
