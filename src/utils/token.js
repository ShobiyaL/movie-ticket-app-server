const jwt = require('jsonwebtoken');

const createTokenFunc = (payload)=>{
    
     return jwt.sign(payload,process.env.SECRET_STRING)
};

const validateTokenFunc = (token)=>{
    console.log(token);
    return jwt.verify(token, process.env.SECRET_STRING)
}

module.exports={createTokenFunc,validateTokenFunc}