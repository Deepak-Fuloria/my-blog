const express=require("express")
 const router=express.Router()
 const {auth}=require("../middleware/auth")
const {profile,logout}=require("../controller/profileController")

router.get("/profile",auth,profile)
router.get("/logout",logout)


module.exports=router;















