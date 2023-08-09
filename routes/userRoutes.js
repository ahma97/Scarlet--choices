const jwt = require('jsonwebtoken');
const express = require("express");
const userController = require('../controllers/userController')
// const testController = require ('../controllers/userController.js')
const middleware = require ('../middleware/userMiddleware.js')
//Router Object
const router = express.Router()
//Routing
//Register Method =Post
router.post("/register",userController.registerController)

//LOGIN
router.post('/login',userController.loginController)

router.post('/forgot-password' , userController.forgotPasswordController)

//Test
router.get('/test' , middleware.requireSignIn, middleware.isAdmin,userController.testController)
//Auth Route /User Protected Route
router.get('/user-auth', middleware.requireSignIn, (req, res)=>{

  res.status(200).send({ok: true});
});
//Protected Admin Route
router.get('/admin-auth', middleware.requireSignIn, middleware.isAdmin, (req, res) =>{

  res.status(200).send({ok: true});
});
// update Profile

router.put('/profile', middleware.requireSignIn , userController.updateProfileController)

router.get('/orders', middleware.requireSignIn ,userController.getOrdersController)

router.get('/all-orders', middleware.requireSignIn ,middleware.isAdmin,userController.getallOrdersController)

router.put('/order-status', 
middleware.requireSignIn ,
middleware.isAdmin,
userController.orderStatusController)

module.exports = (router)