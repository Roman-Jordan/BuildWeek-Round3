const jwt = require('jsonwebtoken')
module.exports=(role)=>{
    return (req,res,next)=>{
        jwt.verify(req.headers.authorization,process.env.SECRET,(err,decoded)=>{
            console.log(decoded)
            next()
        })
    }
}