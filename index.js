const express=require("express")
const app=express()
const mongoose=require("mongoose")
 const bodyParser = require('body-parser')
require("dotenv").config()
const connect=require("./models/db")        //connection with mongo
const PORT=process.env.PORT || 3000;
 connect();                                 //connection with mongo
const postRoutes=require("./routes/postsRoutes")
const path=require("path")

 var session = require('express-session');

 var MongoDBStore = require('connect-mongodb-session')(session);
const flash=require("express-flash")
const userRoutes=require("./routes/userRoutes")
 const profileRoutes=require("./routes/profileRoutes")


var store = new MongoDBStore({
  uri: process.env.DB,
  collection: 'mySessions'
});

app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

app.use(flash())
app.use((req,res,next)=>{
 res.locals.message=req.flash()
 next();
})
 app.use(express.static(path.join(__dirname,"./views")))

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.set("view engine","ejs")

app.use(userRoutes)
app.use(profileRoutes)
app.use(postRoutes)

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server is running on port no ${process.env.PORT || 3000}`)
   
})


















































