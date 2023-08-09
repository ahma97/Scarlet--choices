const express = require ("express");
const middleware = require('../middleware/userMiddleware.js')
const controllers = require ("./../controllers/categoryController.js");

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  middleware.requireSignIn,
  middleware.isAdmin,
  controllers.createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  middleware.requireSignIn,
  middleware.isAdmin,
  controllers.updateCategoryController
);

//getALl category
router.get("/get-category", controllers.categoryController);

//single category
router.get("/single-category/:slug", controllers.singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  middleware.requireSignIn,
  middleware.isAdmin,
  controllers.deleteCategoryCOntroller
);

module.exports  = (router);
