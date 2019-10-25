const router = require("express").Router();
const dbModel = require("./authModel");
const bcrypt = require("bcryptjs");
const { genToken } = require("./preAuth/genToken");
const validateUser = require('./preAuth/authHelpers')
const validateRole = require('./preAuth/verifiyRole')



router.get('/',validateRole(2),(req,res)=>{
  dbModel.findAll().then(p=>res.status(404).json(p)).catch(e=> res.status(404).json(e))
})

router.post("/register",validateUser,(req, res) => {
  const u = req.body;
    const hash = bcrypt.hashSync(u.password, 8);

    const user = { ...u, password: hash };
    return dbModel
      .add(user)
      .then(p => {
        if (p.username) {
          const token = genToken(p);
          res.status(201).json(token);
        }
        res.status(201).json();
      })
      .catch(e => res.status(404).json(e.detail && e.detail.split('=').pop().replace(/[\W_]+/g," ")||e));
  
});

router.post("/login",validateRole(1), (req, res) => {
  const { username, password } = req.body;
  return dbModel
    .findByUserName(username)
    .then(p => {
      console.log(p);
      p
        ? bcrypt.compare(password, p.password, (err, decoded) => {
            const token = genToken(p);
            if (decoded) {
              res.status(201).json({ ...token });
            } else {
              res.status(401).json({ msg: "Please Provide a vaild Password" });
            }
          })
        : res.status(404).json({ msg: "User not Found" });
    })
    .catch(e => {
      res.status(404).json({ msg: "username or password not provided" });
    });
});

router.use("/*", (req, res, next) => {
  res.status(404).json(shape);
});

const shape = [
  {
    method: "POST",
    Authenticated: true,
    Role: "*",
    url: "/api/register/",
    req: {
      body: {
        username: "Type String, Min 5, Max 50",
        password: "Type String, Min 5, Max 50",
        email: "Type Email, Min 5, Max 100",
        role: "Type INTEGER, Role ID"
      }
    }
  },
  {
    method: "POST",
    action: "login",
    Authenticated: false,
    Role: "*",
    url: "/api/login/",
    req: {
      body: {
        username: {
          type: "string",
          unique: true,
          required: true,
          min: 5,
          max: 50
        },
        password: {
          type: "string",
          min: 8,
          max: 50
        },
        email: {
          unique: true,
          min: 8,
          max: 50
        }
      }
    }
  },
  {
    method: "POST",
    action: "forgot",
    Authenticated: false,
    Role: "*",
    url: `/api/forgot/`,
    req: {
      body: {
        email: {
          required: true,
          min: 8,
          max: 50
        }
      }
    }
  }
];

module.exports = router;
