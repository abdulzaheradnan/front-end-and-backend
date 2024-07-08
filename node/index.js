const express = require("express")
const cors = require("cors")
require("dotenv").config()
const apirouter=require("./apis")
const signuprouter=require("./signupdata")
const app = express()
const port = process.env.Application_port


app.use(cors())
app.use(express.json())
app.use("/", apirouter)
app.use("/",signuprouter)


app.listen(port, (req, res) => {
    console.log(`http://localhost:${port}`)

})
app.get("/", (req, res) => {
    res.send(`<h1>hello ${port}</h1>`)

})

//hello doston
