const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes")

const app = express();
app.use(express.json());

// logger middleware 
app.use(morgan('dev'));

app.use("/api/students",studentRoutes);
app.use("/api/user",userRoutes);

const port = process.env.PORT;
const mongodburi = process.env.MONGO_URI;

// mongodb connection 
mongoose.connect(mongodburi,{useNewUrlParser : true,useUnifiedTopology : true})
.then((result) => app.listen(port,() => console.log(` Connected To MongoDb & Running On Port ${port}`)))
.catch((error) => console.log("Error While Connecting To MongoDb : ",error))