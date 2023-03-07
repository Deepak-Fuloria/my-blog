const formidable=require("formidable")
const fs=require("fs")
const { CLIENT_RENEG_LIMIT } = require("tls")
const Posts = require("../models/post")
const posts=require("../models/post")
const Users = require("../models/User")



const postForm=async(req,res)=>{
   
  const error=[]
   res.render("createPost",{title:"Create Post",login:true,error,postTitle:"",body:""})
 
}
const storePosts=async(req,res)=>{
   
    const form=formidable()
    form.parse(req,(err,fields,files)=>{
       const error=[];
       const{title,body}=fields;
       if(title.length===0)
       {
        error.push({msg:"Title is required"})
       }
       if(body.length===0)
       {
        error.push({msg:"Write something inside body"})
       }
       
       const imageName=files.image.originalFilename;
       const split =imageName.split(".")
       let extName=split[split.length-1].toUpperCase();
       
       if(files.image.originalFilename.length===0)
       {
        error.push({msg:"Image is required"})
       }
       else if(extName!=="JPG" && extName!=="PNG")
      {
        error.push({msg:"only jpg and png are allowed"})
      }
           
      if(error.length!==0) 
      {
        res.render("createPost",{title:"Create Post",login:true,error:error,postTitle:title,body})
      }
      else{
        const oldPath=files.image.filepath
        
        const newPath=__dirname + '\\..\\views\\assets\\img\\' + files.image.newFilename
        fs.readFile(oldPath,(err,data)=>{
          if(!err){
            fs.writeFile(newPath,data,(err)=>{
              if(!err){
                fs.unlink(oldPath,async(err)=>{
                  if(!err){
                    const id=req.id;
                    try{
                      const user=await Users.findOne({_id:id})
                  
                      const name=user.name;
                      const newPost=new posts({
                        userId:id,
                        title,
                        body,
                        image:files.image.newFilename,
                        userName:name
                      })
                      try{
                        const result=await newPost.save()
                        if(result){
                          req.flash("success","your post has been added successfully")
                         res.redirect("/posts/1")
                        }
                      }catch(err){
                        res.send(err.msg)
                      }
                    }catch(err){
                      res.send(err.msg)
                    }
                  }
                })
              }
              else{
                console.log(err)
              }
            })
          }
        })

      }



    }
    )
 
}


const postHandle=async(req,res)=>{
   const id=req.id;
   let currentPage=1
   let page=req.params.page;
   if(page){
    currentPage=page;
   }
   const perPage=4;
   const skip=(currentPage-1)*perPage;
  const allPost=await posts.find({userId:id}).skip(skip).limit(perPage).sort({updatedAt:-1})
  const count=await posts.find({userId:id}).countDocuments();
     res.render("posts",{title:"posts",login:true,posts:allPost,count,perPage,currentPage})
   
  }

  const details=async(req,res)=>{
    const id=req.params.id
    const details=await posts.findOne({_id:id})
    res.json(details)
  res.render("details",{title:"Post Details",login:true,details})
  
  
  }

module.exports=
{
   
    storePosts,
    postForm,
    postHandle,
     details
   
}























