const router = require('express').Router()
const authRouter = require('./auth/auth')


router.use('/', authRouter)



module.exports=router