const express=require("express")
const jwt=require("jsonwebtoken")
const Loginrouter=express.Router()


Loginrouter.post("/login",(req,res,next)=>{
    const {token,message}=req.body
    console.log("token",token,message)
    const decode=jwt.verify(token,process.env.Secret_key)
    if(decode){

        res.send({
            data:decode
        })
    }else{
        res.send({
            data:"wrong tokens"
        })
    }

})

module.exports=Loginrouter