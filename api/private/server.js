const privateRouter = require('express')

//Bring in the Routes
const dinerRouter = require('./diner/diner')
const operatorRouter = require('./operator/operator')
const profileRouter = require('./profile/profile')

privateRouter.use('/diner',dinerRouter)
privateRouter.use('/operator',operatorRouter)
privateRouter.use('/profile',profileRouter)


module.exports=privateRouter