require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const axios = require('axios');
const port=process.env.port||4000
const url=process.env.mongodbURL
const palmkey=process.env.KEY
const aiApiurl=`https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${palmkey}`
const verifyToken=require('./middleware/verifytoken')

//Models
const responseModel=require('./model/resposeModel')

//Routes
const userRoute=require('./route/userRoute')
const likeRoute=require('./route/likeRoute')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/user',userRoute)
app.use('/like',likeRoute)

app.post('/',verifyToken,async(req,res)=>{
       try{
        // console.log(req.body.prompt)
        const data={
            "prompt":{
              "text":'Provide a short story based on following prompt:'+req.body.prompt
            }
          }
            // console.log(req.body)
            // const response=await axios.post(aiApiurl, data)
            axios.post(aiApiurl,data)
                .then((response) => {
                // Handle the response
                    res.status(200).json({data:response.data,message:'success'})
                })
                .catch((error) => {
                // Handle any errors
                    res.status(500).json({error:error, message:'Internal Server Error!'})
                });
            

            // res.status(200).json({data:response,message:'success'})

       }catch(err){
           res.status(500).json({error:err, message:'Internal Server Error!'})
       }
}) 

app.post('/save',verifyToken,async(req,res)=>{
    try{
        // console.log(req.body)
        const response=new responseModel({
            ques:req.body.ques,
            ans:req.body.ans,
            user:req.body.user
        })
        await response.save()
        res.status(200).json({message:"Response Saved!"})

    }catch(err){
        res.status(500).json({error:err,message:'Internal Server Error!'})
    }
})

app.get('/response/:id',verifyToken,async(req,res)=>{
    try{
          const response=await responseModel.find({user:req.params.id}).exec()
          res.status(200).json({data:response,message:'Success'})
    }catch(err){
        res.status(500).json({error:err,message:'Internal Server Error'})
    }
})

app.get('/response',verifyToken,async(req,res)=>{
    try{
          const response=await responseModel.find().sort({like:-1}).exec()
          res.status(200).json({data:response,message:'Success'})
    }catch(err){
        res.status(500).json({error:err,message:'Internal Server Error'})
    }
})

app.get('/response/single/:id',verifyToken,async(req,res)=>{
    try{
          const response=await responseModel.findById({_id:req.params.id}).populate('user').exec()
          res.status(200).json({data:response,message:'Success'})
    }catch(err){
        res.status(500).json({error:err,message:'Internal Server Error'})
    }
})

app.delete('/:id',verifyToken,async(req,res)=>{
    try{
        const response=await responseModel.findByIdAndDelete(req.params.id)

        res.status(200).json({message:"Deleted successfully!"})
    }catch(err){
        console.log(err)
        res.status(500).json({error:err,message:'Internal Server Error!'})
    }
})

app.listen(port,()=>{
    console.log(`Server running at ${port}`)
})


//Database
mongoose.connect(url)
const db=mongoose.connection
db.on('error',(error)=>{
    console.error('MongoDB connection error:',error)
})
db.once('open',()=>{
    console.log('Connected to MongoDB')
})