module.exports={
    validUser
}

const validated={
    errors:[],
    valid:this.errors.length
}


function validUser(user){
    !user.username && validated.errors.push({username:'Username is Required'})
    user.username < 5 && user.username > 50 && validated.errors.push({username:'Username Must Be '})
    //Validate User
    !user.password && validated.errors.push({password:'Username is Required'})
    user.password < 5 && user.password > 50 && validated.errors.push({password:'Password Must Be '})

    !user.email && validated.errors.push({email:'Username is Required'})
    user.email < 5 && user.email > 50 && validated.errors.push({email:'Must Provide a valide email'})

    return validated.valid ? 
}