const express = require("express");
const colors = require("colors")
const dotenv = require("dotenv")
const morgan = require("morgan")
const connectDb = require('./config/db')
const userRoutes = require('./routes/userRoutes') 
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require ('./routes/productRoutes')
const cors = require('cors')
const path = require('path')
const fileURLToPath = require ("url")

//env config

dotenv.config();
connectDb();

//ES Module
const__filename = fileURLToPath(import.meta.url); 
const app = express();
//Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"./client/build")))

//Routes
app.use("/api",userRoutes);
app.use("/api/category", categoryRoutes)
app.use('/api/product', productRoutes )


const PORT = process.env.PORT || 8000;

//rest api
app.use("*", function (req,res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})
app.listen(PORT ,()=>{
  console.log(`Server is Running on ${PORT}`.bgGreen.white)
})