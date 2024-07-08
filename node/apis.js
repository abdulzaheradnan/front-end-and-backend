const express=require("express")
require("dotenv").config()
const { MongoClient } = require("mongodb")
const url = process.env.Database_url
const client = new MongoClient(url)
const dbname = process.env.Database_name
const apirouter=express.Router()


apirouter.get("/data",async(req,res,next)=>{
    await client.connect()
    console.log("connected to server")
    const db = client.db(dbname)
    const collection = db.collection("Employelist")
    const result = await collection.find({}).toArray()
    res.send({
        data: result,
        message: "success"
    })

   
})
module.exports=apirouter