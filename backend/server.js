const express=require("express");
const app=express();
const mongoose=require("mongoose");
const router =require("./routes/userRoutes");
app.use("/",(req,res,next)=> {
      res.send("Hello World");
})
mongoose.connect("mongodb+srv://admin:itsFpvKO5KVyjNyh@cluster0.442zb.mongodb.net/BlogApp?retryWrites=true&w=majority").then(()=>app.listen(5000)).then(()=>{console.log("Successfully Connected")}).catch((err)=>console.log(err));
//itsFpvKO5KVyjNyh