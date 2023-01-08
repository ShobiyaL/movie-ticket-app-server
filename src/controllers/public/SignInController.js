const User = require('../../models/user');
const {decryptFunc} = require('../../utils/hashFunction');
const {createTokenFunc} = require('../../utils/token')

const SignIncontroller = async(req,res)=>{
   const {email,password} = req.body;
   try {
    if(!email || !password){
        return res.status(403).json({message:"Fields should not be empty",type:"error"})
    }
    const user = await User.findOne({email})
    // console.log(user)
    if(!user){
        return res
        .status(401)
        .json({ message: "wrong credentials",type:"error" });
    }
    const validUser = decryptFunc(password,user.password);
    if(!validUser){
        return res
        .status(401)
        .json({ message: "wrong credentials",type:"error" });
    }
    let role="user";
    if(user.email===process.env.ADMIN_EMAIL_ID){
        role="admin"
    }
    const payload ={
        email:user.email,
        username:user.username,
        id:user._id,
        role,
    }
    const token = createTokenFunc(payload);
    res.json({
        userInfo:payload,
      userToken:  token,
        type:"success",
        message:"user logged in successfully",
        role
    })
   } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message,type:"error" });
   }
}

module.exports = SignIncontroller;