const mongoose = require("mongoose")
const colors = require("colors")
const { lightblue } = require("color-name")
const { log } = require("console")
const connectDb = async() =>{
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to MongoDb Database ${connect.connection.host}`.bgGreen);
  } catch (error) {
    console.log(error)
  }
}


 module.exports = (connectDb);