const mongoose = require("mongoose");
const express = require("express");
const app = express();
const productController = require("./controller/controller");
const usercontroller = require("./controller/usercontroller");
const cartcontroller = require("./controller/cartcontroller");
const admincontroller = require("./controller/admincontroller");
const discuntcontroller = require("./controller/discuntcontroller");
const adminauth = require("./controller/authadmin");
const authuser = require("./controller/authuser");
var cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

async function connectToMongoDB() {
  await mongoose.connect(
    "mongodb+srv://singhman2005123:cll2I4wjPunCRINO@cluster0.dgxbtyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    }
  );
  console.log("Connected to MongoDB");
}

connectToMongoDB();

//task4 -admin access needed except when logging, needs admin cookie even when signup
app.post("/adminsignup", adminauth, admincontroller.createadmin);
app.post("/adminlogin", admincontroller.loginadmin);
app.post("/products", adminauth, productController.createProduct);
app.get("/users", adminauth, admincontroller.getusers);
app.get("/user/:email", adminauth, admincontroller.getuserinfo);
app.get("/products/:id", productController.getproduct);
app.delete("/products/:id", adminauth, productController.deleteproduct);

//task3 cart - user/admin access needed
app.post("/signup", usercontroller.createuser);
app.post("/login", usercontroller.loginuser);
app.post("/cart/add", authuser, cartcontroller.addcart);
app.get("/cart/", authuser, cartcontroller.viewcart);
app.patch("/cart/clear", authuser, cartcontroller.clearcart);
app.delete("/cart/delete", authuser, cartcontroller.deletecart);

//task5 -additional tasks - discount logic
app.post("/coupons", adminauth, discuntcontroller.createCoupon);
app.delete("/coupons/:coupon", adminauth, discuntcontroller.deleteCoupon);

//task 2
app.post("/supplier/modify", adminauth, productController.changeqty);

module.exports = app;
