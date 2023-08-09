const userModel = require ("../models/userModel.js")
const OrderModel = require ("../models/OrderModel.js")
const helper = require ("./../helpers/userHelper.js");
const JWT = require ("jsonwebtoken");


 const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer} = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
  
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered Please Login",
      });
    }
    //register user
    const hashedPassword = await helper.hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//POST LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered",
      });
    }
    const match = await helper.comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "30d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//Forget Password

const forgotPasswordController = async (req, res )=>{
try {
  const {email, answer, newPassword} = req.body
  if(!email){
res.status(400).send({
  message:"E-mail is Required"})
  }
  if(!answer){
    res.status(400).send({
      message:"Answer is Required"})
      }
      if(!newPassword){
        res.status(400).send({
          message:"Password is Required"})
          }
          //Check
          const user = await userModel.findOne({email, answer})
          //Validation

          if(!user){
            return res.status(404).send({
              success:false,
              message:"Wrong E-mail or Answer"
            })
          }
  const hash = await helper.hashPassword(newPassword)
  await userModel.findByIdAndUpdate(user._id, {password:hash})
  res.status(200).send({
    success:true,
    message:"Password Reset Successfully"
  })
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message:"Something went Wrong"
  })
}

}

const testController = (req, res) =>{
  res.send('Protected Route');
}

const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

const getOrdersController = async (req, res)=>{
try {
  const orders = await OrderModel.find({buyer:req.user._id}).populate("products" ,"-photo").populate('buyer','name')
  res.json(orders)
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message:"Error in Getting Orders",
    error

})
}}
const getallOrdersController = async (req, res)=>{
try {
  const orders = await OrderModel.find({})
  .populate("products" ,"-photo").populate('buyer','name')
  .sort({createdAt : "-1"});
  res.json(orders)
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message:"Error in Getting Orders",
    error

})
}}


 const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
};



module.exports = {registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getallOrdersController,
  orderStatusController
}