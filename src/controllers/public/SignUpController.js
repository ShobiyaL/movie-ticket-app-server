const User = require('../../models/user');
const { encryptFunc } = require('../../utils/hashFunction');

const SignUpController = async(req,res)=>{
    const {username,email,password} = req.body;
    // console.log(password)
    try{
        if(!username || !email || !password){
          return res.status(403).json({message:"Fields should not be empty",type:"error"})
        }
        const newPassword = await encryptFunc(password);
        // console.log(newPassword);
        const response = await User.create({
            username,
            email,
            password:newPassword,
        });
        if(!response){
           return  res
           .status(403)
           .send({ message: "Provide valid email",type:"error" });
        }
        res.json({message:"User created successfully",type:"success"});
    }catch(error){
        // console.log(error);
        res.status(500).json({message:`${error.message}--Problem in SignUp`,error})
    }
}

module.exports = SignUpController;