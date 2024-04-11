# enactus-backend
# Backend API Endpoints Documentation

## Admin Management Endpoints

### 1. POST /adminsignup
- **Description:** Endpoint for admin signup.
- **Middleware:** `adminauth` for authentication.
- **Controller:** `admincontroller.createadmin`

### 2. POST /adminlogin
- **Description:** Endpoint for admin login.
- **Controller:** `admincontroller.loginadmin`

### 3. POST /products
- **Description:** Endpoint to create a new product.
- **Middleware:** `adminauth` for admin access.
- **Controller:** `productController.createProduct`

### 4. GET /users
- **Description:** Endpoint to get all users.
- **Middleware:** `adminauth` for admin access.
- **Controller:** `admincontroller.getusers`

### 5. GET /user/:email
- **Description:** Endpoint to get user information by email.
- **Middleware:** `adminauth` for admin access.
- **Controller:** `admincontroller.getuserinfo`

### 6. GET /products/:id
- **Description:** Endpoint to get product details by ID.
- **Controller:** `productController.getproduct`

### 7. DELETE /products/:id
- **Description:** Endpoint to delete a product by ID.
- **Middleware:** `adminauth` for admin access.
- **Controller:** `productController.deleteproduct`

## User Management Endpoints

### 8. POST /signup
- **Description:** Endpoint for user signup.
- **Controller:** `usercontroller.createuser`

### 9. POST /login
- **Description:** Endpoint for user login.
- **Controller:** `usercontroller.loginuser`

### 10. POST /cart/add
- **Description:** Endpoint to add items to the cart.
- **Middleware:** `authuser` for user authentication.
- **Controller:** `cartcontroller.addcart`

### 11. GET /cart/
- **Description:** Endpoint to view the cart.
- **Middleware:** `authuser` for user authentication.
- **Controller:** `cartcontroller.viewcart`

### 12. PATCH /cart/clear
- **Description:** Endpoint to clear the cart.
- **Middleware:** `authuser` for user authentication.
- **Controller:** `cartcontroller.clearcart`

### 13. DELETE /cart/delete
- **Description:** Endpoint to delete items from the cart.
- **Middleware:** `authuser` for user authentication.
- **Controller:** `cartcontroller.deletecart`

## Additional Tasks

### 14. POST /coupons
- **Description:** Endpoint to create a coupon.
- **Middleware:** `adminauth` for admin access.
- **Controller:** `discuntcontroller.createCoupon`

### 15. DELETE /coupons/:coupon
- **Description:** Endpoint to delete a coupon by code.
- **Middleware:** `adminauth` for admin access.
- **Controller:** `discuntcontroller.deleteCoupon`

## Task 2

### 16. POST /supplier/modify
- **Description:** Endpoint to modify supplier details (e.g., change quantity).
- **Middleware:** `adminauth` for admin access.
- **Controller:** `productController.changeqty`
