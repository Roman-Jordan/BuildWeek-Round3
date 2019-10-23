const router = require("express").Router();
const dbModel = require("./authModel");
const bcrypt = require("bcryptjs");
const {genToken}= require('./preAuth/genToken')

router.post("/register", (req, res) => {
  const u = req.body;
  if (u.username && u.password && u.email) {

    const hash = bcrypt.hashSync(u.password,8)
    
    const user = {...u,password:hash}
    return dbModel
      .add(user)
      .then(p => {
        if(p.username){
          const token = genToken(p)
          res.status(201).json(token)
        }
        res.status(201).json();
      })
      .catch(e => {
        res.status(404).json(e);
      });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  return dbModel
    .findByUserName(username)
    .then(p => {
      console.log(p)
      p ? 
      bcrypt.compare(password,p.password,(err,decoded)=>{
        const token = genToken(p)
        if(decoded){
        res.status(201).json({...token})
        } else{
          res.status(401).json({msg:'Please Provide a vaild Password'})
        }
      })
      
      :res.status(404).json({msg:'User not Found'})
    })
    .catch(e => {
      res.status(404).json({msg:'username or password not provided'});
    });
});

router.get('/',(req,res)=>{
  return dbModel
    .findAll()
    .then(user=>res.status(200).json(user))
    .catch(err => res.status(500).json(err))
})



module.exports = router;