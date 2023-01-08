const Movie = require('../../models/movie');

const GetAllMoviesController = async(req,res)=>{
  const qParams = req.query;
  console.log(qParams);
    try{
       const movies = await Movie.find();
       if (!movies) {
        return res.status(404).json({ message: "movies not found",type:"error" });
      }
      res.json({ message: "Listed all movies",type:"success", movies });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: error.message, type:"error" });
    }
}

module.exports = GetAllMoviesController;