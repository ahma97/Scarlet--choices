const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:String,
    required:true,
  },
  address:{
    type:{},
    required:true,
  },
  answer : {
    type :String,
    required :true,
  },
  role:{
    type:Number,
    default:0
  },
},
{ timestamps: true });

module.exports = mongoose.model("users",userSchema)
