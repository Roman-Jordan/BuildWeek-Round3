const jwt = require('jsonwebtoken')
module.exports={
    genToken
}

const secret = process.env.SECRET || 'MySuperSecretP@$$%@'


function genToken(user) {
    
    const payload = {
      subject: user.id, // sub in payload is what the token is about
      username: user.username,
      // ...otherData
    };
  
    const options = {
      expiresIn: '1d', 
    };
    
    const token = jwt.sign(payload,secret , options)
    const token_type = 'Basic '
    user.password && delete user.password
    user.email && delete user.email
    return {user,token_type,token}; 
  }