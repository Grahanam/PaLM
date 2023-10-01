const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User=require('../model/userModel')




//Sign up
router.post('/signup',async(req,res)=>{
//    console.log(req.body)
   try{
      const {username,fullname,password}=req.body

      const existingUser=await User.findOne({username:username})
      if(existingUser){
        res.status(400).send({message:"Username already exists"})
      }else{
          const hashedpass=await bcrypt.hash(password,10)
          if(hashedpass){
            const user=new User({
                username,
                fullname,
                password:hashedpass,
            })
            const saveuser=await user.save()
            if(saveuser){
                res.status(200).send(saveuser)
            }else{
                res.status(500).send({message:"user saving error"})
            }
          }else{
            res.status(500).send({message:"Password not hashed correctly"})
          }
      }
   }catch(err){
    console.log(err)
        res.status(500).send({message:"Internal server error"})
   }
})


//Log in
router.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body
        const founduser=await User.findOne({username})
        // console.log(founduser)
        if(founduser){
            const checkpass=await bcrypt.compare(password,founduser.password)
            if(checkpass){
                const token=await jwt.sign({
                    userId:founduser._id,
                    username:founduser.username,
                    fullname:founduser.fullname
                },
                process.env.SECRETKEY,
                    {expiresIn:"24h"}
                );
            res.status(200).send({message:"Login successful",token,user:founduser.username,userId:founduser._id,fullname:founduser.fullname})    

            }else{
                res.status(500).send({message:"Password does not match"})
            }

        }else{
            res.status(400).send({message:'User not found'})
        }

    }catch(err){
        console.log(err)
        res.status(500).send({message:'Internal server Error'})
    }

})


module.exports=router