const User = require ('../../models/user') 

exports.getUserProfile = async (req, res) => {
  const { email, role } = req.userObj;
  // console.log(email);
  try {
    if (role === "admin") {
      return res.status(400).json({ message: "Resource denied", type: "error" });
    }
    const userFound = await User.findOne({ email }).select(
      "username email "
    );
    console.log(userFound)
    if (!userFound) {
      return res.status(400).json({ message: "No user Found", type: "error" });
    }
    res.json({ message: "User Found", type: "success", userFound });
  } catch (error) {
    return res.status(500).json({ message: error.message, type: "error" });
  }
  }