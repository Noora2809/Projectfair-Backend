//loads .env file contents into process.env by default
require('dotenv').config()

//import express and cors
const express = require('express') 
const cors = require('cors')


const db = require("./DB/connection")

//create backend app using express
const pfServer = express() //creates express application

const router = require('./Routes/router')

const appMiddleware = require("./Middlewares/appMiddleware")

//use cors
pfServer.use(cors())
pfServer.use(express.json()) //returns a middleware that only parses json
pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads')) //img exporting to frontend

//port creationn
const PORT = 4000 || process.env.PORT

//server listening
pfServer.listen(PORT,()=>{
    console.log("listening on port " +PORT);
})

//localhost:4000 -> res pfServer is started
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project fair server started</h1>`)
})