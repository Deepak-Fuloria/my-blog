    const Users=require("../models/User")
    const jwt = require('jsonwebtoken');
    const bcrypt=require("bcrypt")
    const loadSignup=(req,res)=>{
        title="Create new account"
        res.setHeader("content-type","text/html")
        res.render("register",{title,error:[],input:req.body,login:false})
    }
  
    const loadLogin=(req,res)=>{
        title="User login"
        res.setHeader("content-type","text/html")
        res.render("login",{title,error:[],input:req.body,login:false})
    }

    const postLogin=async(req,res)=>{
        const error=[]
        const {name,email,password}=req.body;  
        if(email==="" || password==="")
        {
            res.render("login",{title:"User Login",error:[{msg:"Fill email and password"}],input:req.body,login:false})
        }
        else{
           const {email,password}=req.body;
         const checkEmail=await Users.findOne({email:email})
         if(checkEmail !==null){
            const id =checkEmail._id;
            const dbPassword=checkEmail.password;
            const passwordVerify=await bcrypt.compare(password,dbPassword)
           if(passwordVerify){
            const token=jwt.sign({userId:id},process.env.JWTKEY||"myjwtkey",{
                expiresIn:"7d"
            })
            req.session.user=token;
            res.redirect("/profile")
           }
           else{
            res.render("login",{title:"User Login",error:[{msg:"You entered wrong password"}],input:req.body,login:false})
           }
         }
         else{
            res.render("login",{title:"User Login",error:[{msg:"Email not found"}],input:req.body,login:false})
         }
        }
    }

    const postRegister=async(req,res)=>{

        const error=[]
        const {name,email,password}=req.body;  
        
        if(name===""|| email==="" || password==="")
        {
            res.render("register",{title:"Create new account",error:[{msg:"Fill all details"}],input:req.body,login:false})
        }
        else{
            try{
                const userEmail=await Users.findOne({email:email})
                if(userEmail===null)
                {
                    const salt=await bcrypt.genSalt(10)
                    const hashedPassword=await bcrypt.hash(password,salt)
                    const newUser=new Users({
                    name:name,
                    email:email,
                    password:hashedPassword
        })
            try{
                const createdUser=await newUser.save();
                req.flash("success","your account have been created successfully")
                res.redirect("/login")
            }catch(err){
                console.log(err.message)
            }
               
                }else{
                    title="Create new account"
                    res.render("register",{title:"Create new account",error:[{msg:"email already exists"}],input:req.body,login:false})
                }
            }catch(err){
                console.log(err.message)
            }
        }
      
             
     
     }



module.exports={
    loadSignup,
    loadLogin,
    postRegister,
    postLogin
}

















