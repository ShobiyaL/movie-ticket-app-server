const Cinema = require('../../../models/cinema');

const CreateCinemaController = async (req,res)=>{
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

module.exports = CreateCinemaController