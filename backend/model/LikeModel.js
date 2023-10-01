const mongoose=require('mongoose')


const likeSchema=new mongoose.Schema({
      user:{
        type:mongoose.Schema.Types.ObjectId,ref:'usermodel',
        required:true
      },
      response:{
        type:mongoose.Schema.Types.ObjectId,ref:'response',
        required:true
      }
})

module.exports=mongoose.model('like',likeSchema)
