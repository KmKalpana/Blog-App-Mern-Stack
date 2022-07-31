const bcrypt=require("bcryptjs");
const User=require("../model/User");
const getAllUser = async (req,res,next)=>{
    let users;
    try{
        users=await User.find();

    } catch (err){
        console.log(err);
    }
    if(!users)
    {
        return res.status(404).json({message: "No User Found"});
    }
    return res.status(200).json({users});
}
const signup= async (req,res,next)=>{
  const {name, email, password, blog}=req.body;
  let existingUser;
   try{
   existingUser= await User.findOne({email});
   }catch(err)
   {
    console.log(err);
   }
   if(existingUser)
   {
    console.log("User already exist", existingUser);
    return res;
    return res.status(400).json({message:"User already Exist"});
   }
   const hashedpassword=bcrypt.hashSync(password);
   const user = new User({
    name,email,password:hashedpassword,
    blog:[],
   });
   try{
     await user.save();
     console.log(user);
   }catch(err){
   return console.log(err);
   }
   return res.status(201).json({user});
}
const login=async(req,res,next)=>{
 const {email,password}=req.body;
  let existingUser;
   try{
   existingUser= await User.findOne({email});
   }catch(err)
   {
    console.log(err);
   }
   if(!existingUser)
   {
    console.log("User doesn't exist");
    return res;
    return res.status(404).json({message:"User doesn't Exist"});
   }
   const isCorrectPassword=bcrypt.compareSync(password,existingUser.password);
    if(!isCorrectPassword)
   {
    console.log("Password doesn't match.");
    return res;
   }
     return res.status(200).json({message:"Login Successfully.", user:existingUser});
}
module.exports={getAllUser, signup, login};