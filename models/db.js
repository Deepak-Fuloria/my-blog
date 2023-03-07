const mongoose=require("mongoose")

const connect=async()=>{
try{
    await mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true})
    console.log("connecton created")
}catch(error){
         console.log(error.msg)
     }

}

module.exports=connect;    
