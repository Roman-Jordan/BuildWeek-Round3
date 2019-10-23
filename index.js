const express = require('express')
const server = express()
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()


//Configure Globals
const PORT = process.env.PORT || 5000
const path = require('path')
global.dbConfig = path.resolve(__dirname + '/data/dbConfig')


//Bring in the routes
const primaryRouter = require('./api/server')

//INIT SERVER
server.use(helmet())
server.use(cors())
server.use(express.json())

//Require Routes
server.use('/api',primaryRouter)

server.use('/*',(req,res)=>{
    res.status(200).json({msg:"Welcome"})
})

server.listen(PORT,()=>{
    console.log(`\n** SERVER Listening on PORT:${PORT} **\n`)
})