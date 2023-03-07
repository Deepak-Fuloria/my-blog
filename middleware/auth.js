const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    if(req.session.user){
        const token=req.session.user
        const verify=jwt.verify(token,process.env.jwtKey||"myjwtkey")
       
      if(!verify) {
       return res.redirect("/login")
      }
      else{
        req.id=verify.userId;
      } 
    }else{
       return res.redirect("/login")
    }

    next()
}

const stopLogin=(req,res,next)=>{

if(req.session.user){
    const token=req.session.user
    const verify=jwt.verify(token,process.env.jwtKey||"myjwtkey")
   
    if(verify){
       return res.redirect("/profile")
    }
}

next()

}





module.exports={
    auth,
    stopLogin
}



















