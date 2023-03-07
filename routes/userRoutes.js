    const express=require("express")
    const router=express.Router()
    
    const {loadSignup,loadLogin,postRegister,postLogin}=require("../controller/userController")
  const {stopLogin}=require("../middleware/auth")
  

   router.get("/",loadSignup)
   
   router.get("/login",loadLogin)
    
   router.post("/register",postRegister)
   
   router.post("/login",postLogin)

module.exports=router;















