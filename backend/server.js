const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const router =require("./routes/userRoutes");
const blogRouter=require("./routes/blogRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
mongoose.connect("mongodb+srv://admin:itsFpvKO5KVyjNyh@cluster0.442zb.mongodb.net/BlogApp?retryWrites=true&w=majority").
then(()=>app.listen(5000)).
then(()=>{console.log("Successfully Connected")}).
catch((err)=>console.log(err));