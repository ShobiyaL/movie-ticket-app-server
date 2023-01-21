const Cinema = require('../../../models/cinema');

exports.createCinema = async (req,res)=>{
    const {name,movieId,city,ticketPrice,seats} = req.body;
    try{
        const cinema= await Cinema.create({
         name,
         movieId,
         city,
         ticketPrice,
         seats
     })
        if (!cinema) {
         return res
           .status(401)
           .json({ message: "Try Again, Couldnot save", type: "error" });
       }
       res.json({
         type:"success",
         message:"Cinema(theater) added",
         data:cinema
       })
     }catch(error){
         console.log(error)
         res.status(500).json({message:error.message,type:"error"})
     }
}

exports.updateCinema = async(req,res)=>{
  // const params = req.params;
  // console.log(params)
  try{
    const cinema = await Cinema.updateOne({_id:req.params.cinemaId}, {$set: req.body });
    // console.log(cinema)
    res.json({
      type:"success",
      message:"Cinema(theater) updated successfully",
      
    })
  }catch(error){
    console.log(error)
    res.status(500).json({message:error.message,type:"error"})
  }
}

exports.deleteCinema = async(req,res)=>{
  const { cinemaid } = req.params;

  try {
    if (!cinemaid) {
      return res.status(404).json({ message: "No theater Found", type: "error" });
    }
    const cinemaFound = await Cinema.findById(cinemaid);

    if (!cinemaFound) {
      return res.status(404).json({ message: "No theater Found", type: "error" });
    }
    await Cinema.deleteOne({ _id: cinemaid });

    res.status(200).json({ message: "Cinema Deleted...", type: "success" })
  } catch (error) {
    return res.status(500).json({ message: error.message, type: "error" });
  }
};
