const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())
const { MongoClient } = require("mongodb")

const url = process.env.Database_url
const client = new MongoClient(url)
const dbname = process.env.Database_name
const port = process.env.Application_port


app.get("/data", async (req, res) => {
    await client.connect()
    console.log("connected to server")
    const db = client.db(dbname)
    const collection = db.collection("students")
    const result = await collection.find({}).toArray()
    res.send({
        data: result,
        message: "success"
    })
})


app.listen(port, (req, res) => {
    console.log(`http://localhost:${port}`)

})
app.get("/", (req, res) => {
    res.send(`<h1>hello ${port}</h1>`)

})
app.post("/signin", async (req, res) => {
    console.log("apna", req.body)
    const { username, password } = req.body
    await client.connect()
    console.log("connected to server")
    const db = client.db(dbname)
    const collection = db.collection("Employelist")
    const result = await collection.insertOne({ username, password })
    // const result=await collection.find({}).toArray()
    console.log("insert data", result)
})

//hello doston