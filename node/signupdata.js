const express=require("express")
const bcrypt=require("bcrypt")
const saltRounds=12
require("dotenv").config()
const {MongoClient}=require("mongodb")
const url=process.env.Database_url
const client=new MongoClient(url)
const dbname=process.env.Database_name

const signuprouter=express.Router()

signuprouter.post("/signin",async(req,res,next)=>{
    console.log("apna", req.body)
    const { username, password } = req.body
    await client.connect()
    console.log("connected to server")
    const db = client.db(dbname)
    const collection = db.collection("Employelist")
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        if(err)throw err;
        bcrypt.hash(password,salt,async(err,hash)=>{
            if (err)throw err;
            const result = await collection.insertOne({ username, password:hash })
            client.close()
            res.send({
                message:"signup sucessfully yes"
            })
        })


    })
   
})
module.exports=signuprouter

