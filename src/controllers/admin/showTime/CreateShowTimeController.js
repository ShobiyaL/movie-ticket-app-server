const mongoose = require('mongoose')
const ShowTime = require('../../../models/showTime')

const { ObjectId } = mongoose.Types;




// To add a showTiming
exports.createShowTime = async (req, res) => {
  req.body.date = new Date(req.body.date);
  console.log(req.body.date);
 
    try{
      const showTime = new ShowTime(req.body);
      await showTime.save();
        console.log("production"+showTime);
        if (!showTime) {
         return res
           .status(401)
           .json({ message: "Try Again, Couldnot save", type: "error" });
       }
       res.json({
         type:"success",
         message:"ShowTime added",
         showTime
       })
     }catch(error){
         console.log(error)
         res.status(500).json({message:error.message,type:"error"})
     }
  };