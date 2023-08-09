const express = require("express")
const middleware = require('../middleware/userMiddleware')
const productsControl = require('../controllers/productController') 
const formidable = require('express-formidable')

const router = express.Router();

router.post(
  "/create-product",
  middleware.requireSignIn,
  middleware.isAdmin,
  formidable(),
  productsControl.createProductController
);
//routes
router.put(
  "/update-product/:pid",
  middleware.requireSignIn,
  middleware.isAdmin,
  formidable(),
  productsControl.updateProductController
);

// // //get products
router.get("/get-product", productsControl.getProductController);

// // //single product
router.get("/get-product/:slug", productsControl.getSingleProductController);

// // //get photo
router.get("/product-photo/:pid", productsControl.productPhotoController);

// // //delete 
router.delete("/delete-product/:pid", productsControl.deleteProductController);

// // //filter product
router.post("/product-filters", productsControl.productFiltersController);

// // //product count
router.get("/product-count", productsControl.productCountController);

//product per page
router.get("/product-list/:page", productsControl.productListController);

//search product
router.get("/search/:keyword", productsControl.searchProductController);

//similar product
router.get("/related-product/:pid/:cid", productsControl.realtedProductController);

//category wise product
router.get("/product-category/:slug", productsControl.productCategoryController);

//payments routes
//token
router.get("/braintree/token", productsControl.braintreeTokenController);

//payments
router.post("/braintree/payment", middleware.requireSignIn, productsControl.brainTreePaymentController);

module.exports =(router)