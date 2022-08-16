const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/userRoutes')
const blogRouter = require('./routes/blogRoutes')
const path = require('path')
/* require("dotenv").config();
if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join("frontend/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"fronend", "build", "index.html"));
    })
}*/
app.use(
  cors({
    origin: '*',
  }),
)
app.use(express.json())
app.use('/api/user', router)
app.use('/api/blog', blogRouter)
app.get('/', (req, res) => res.status(200).send('hi there'))
mongoose
  .connect(
    'mongodb+srv://admin:itsFpvKO5KVyjNyh@cluster0.442zb.mongodb.net/BlogApp?retryWrites=true&w=majority',
  )
  .then(() => app.listen(process.env.PORT || 5000))
  .then(() => {
    console.log('Successfully Connected')
  })
  .catch((err) => console.log(err))
