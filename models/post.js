const mongoose=require("mongoose")
const postSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    title:{
        type:String,
        required:true
        
    },
    body:{
        type:String,
        required:true
        
    },
    image:{
        type:String,
        required:true
        
    },
    userName:{
        type:String,
        required:true
        
    }

},{timestamps:true})


const Posts =mongoose.model("Post",postSchema)
module.exports=Posts;



























