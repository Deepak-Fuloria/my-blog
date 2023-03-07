const express=require("express")
const { storePosts,postForm,postHandle,details } = require("../controller/postsController")
const router=express.Router()
const {auth}=require("../middleware/auth")



router.get("/createPost",auth,postForm)
router.post("/createPosts",auth,storePosts)
router.get("/posts/:page",auth,postHandle)
router.get("/details/:id",auth,details)

module.exports=router;






























