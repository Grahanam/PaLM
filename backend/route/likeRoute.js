const express=require('express')

const router=express.Router()
const likeModel=require('../model/LikeModel')
const responseModel=require('../model/resposeModel')
const verifyToken=require('../middleware/verifytoken')


router.post('/',verifyToken,async(req,res)=>{
    try{
         const {user,response}=req.body
         const checklike=await likeModel.findOne({user:user,response:response})
         if(!checklike){
            const like=new likeModel({
                user:user,
                response:response
            })
            await like.save()
            const checkresponse=await responseModel.findById(response)
            if(checkresponse){
               checkresponse.like+=1
               await responseModel.findByIdAndUpdate(checkresponse._id,checkresponse,{new:true})
            }
            res.status(200).json({message:'Story liked!'})
         }else{
            res.status(200).json({message:'Story already liked!'})
         }
    }catch(err){
        res.status(500).json({error:err,message:'Internal Server Error!'})
    }
})

router.get('/check',verifyToken,async(req,res)=>{
    try{
       
        const {user,response}=req.query
        const check=await likeModel.findOne({user:user,response:response})
        if(!check){
            res.status(200).json({data:false,message:'success'})
        }else{
            res.status(200).json({data:true,message:'success'})
        }
        // res.status(200).json({message:'success'})

    }catch(err){
        console.log(err)
        res.status(500).json({error:err,message:'Internal Server Error!'})
    }
})

router.delete('/',verifyToken,async(req,res)=>{
    try{
        const {user,response}=req.query
        const checklike=await likeModel.findOne({user:user,response:response})
        if(checklike){
            const deletelike=await likeModel.findByIdAndDelete(checklike._id)
            const checkresponse=await responseModel.findById(response)
            if(checkresponse){
                if(checkresponse.like>0){
                    checkresponse.like-=1
                    await responseModel.findByIdAndUpdate(checkresponse._id,checkresponse,{new:true})
                }
            }
            res.status(200).json({message:'Like removed!'})
        }else{
            res.status(200).json({message:'Like does not exist'})
        }
        
    }catch(err){
        res.status(500).json({error:err,message:'Internal Server Error'})
    }
})




module.exports=router