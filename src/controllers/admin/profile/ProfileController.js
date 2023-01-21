const User = require ('../../../models/user') 

exports.getUserProfile = async (req, res) => {
   const params = req.params
//    console.log(params)
    const user = await User.findById({_id:req.params.userId})
  
    if (user) {
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }