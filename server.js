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
const { fileURLToPath } = require ('url)


//env config
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();
connectDb();

//ES 
const__dirname = path.dirname(__filename);
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




//rest api
app.use("*", function (req,res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
