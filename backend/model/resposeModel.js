const mongoose=require('mongoose')

const responseSchema=new mongoose.Schema({
    ques:{
        type:String,
        required:true
    },
    ans:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
        requried:true
    },
    like:{
        type:Number,
        default:0
    }

})


module.exports=mongoose.model('Response',responseSchema)