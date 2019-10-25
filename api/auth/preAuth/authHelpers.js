module.exports = async (req, res, next) => {
  const errors = [];

  function validateNewUser(user) {
    const u = user;
    !u.username && errors.push({ username: "required" });
    !u.password && errors.push({ password: "required" });
    !u.email && errors.push({ email: "required" });
    !u.role_id && errors.push({ role: "required" });

    //Validate Char Length
    Object.keys(user).map(x => {
      if (
        x === "password" ||
        x === "username" ||
        x === "email"    ||
        x === "role_id"
      ) {
        const key = u[x].length;

        //Verifiy Length Min
        if (key < 5 && x !== "role_id") {
          errors.push({ [x]: "Must be a minimum of 5 chars" });
        }

        //Verifiy Length Max
        if (key > 50 && x !== "role_id") {
          errors.push({ [x]: "Must be a maximum of 50 chars" });
        }

        //Validate Email Pattern
        if (x === "email") {
          //Cats got your keyboard... When in dbout, RegEx it out
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u[x]) &&
            errors.push({ error: "Unexpected Eamil Address" });
        }

        //Validate Role, There has got to be a better way
        if (x === "role_id") {
          Number(u[x]) &&
            u[x] > 3 &&
            errors.push({ error: "Unrecognized Role" });
          u[x] === 1 &&
            errors.push({ error: "Um... Adminstrator; Really Bro" });
        }

      } else {
        //Why except dirty keys
        errors.push({ error: `Unexpected key: [${x}] provide` });
      }
    });
  }

  validateNewUser(req.body);
  
  errors.length < 1 ? next() : res.status(400).json(errors);
};
