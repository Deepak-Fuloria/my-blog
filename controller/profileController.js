const users=require("../models/User")

const profile=async(req,res)=>{
   
    const id=req.id;
    const user=await users.findOne({_id:id})
    res.render("profile",{title:"profile",login:true,user:user})
    
}

const logout=(req,res)=>{
   req.session.destroy((error)=>{
    if(!error){
        res.redirect("/login")
    }
   })
}


module.exports={
    profile,
    logout,
}








