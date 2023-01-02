
const AdminCheck = async(req,res,next) => {
  const { email, role } = req.userObj;
  try {
    if (!email || !role) {
      return res.status(403).json({ message: "Request Denied",type:"error"});
    }
    if (email === process.env.ADMIN_EMAIL_ID && role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Request Denied" ,type:"error"});
    }
  } catch (error) {
    console.log(error.message, " err-inAdminCheck");
    return res.status(500).send({ message: error.message,type:"error" });
  }
}


module.exports = AdminCheck;