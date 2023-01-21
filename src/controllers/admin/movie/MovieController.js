const Movie = require('../../../models/movie');

exports.createMovie = async(req,res)=>{
    const {title,image,genre,duration,director,cast,description,language,releaseDate,endDate}=req.body;
    try{
       const movie = await Movie.create({
        title,
        image,
        genre,
        duration,
        director,
        cast,
        description,
        language,
        releaseDate,
        endDate
    })
       if (!movie) {
        return res
          .status(401)
          .json({ message: "Try Again, Couldnot save", type: "error" });
      }
      res.json({
        type:"success",
        message:"Movie added",
        movieData:movie
      })
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.message,type:"error"})
    }
}

exports.updateMovie = async(req,res)=>{
    // const params = req.params;
    // console.log(params)
    try{
      const movie = await Movie.updateOne({_id:req.params.cinemaId}, {$set: req.body });
      // console.log(cinema)
      res.json({
        type:"success",
        message:"Movie updated successfully",
        
      })
    }catch(error){
      console.log(error)
      res.status(500).json({message:error.message,type:"error"})
    }
  }
  
  exports.deleteMovie = async(req,res)=>{
    const { movieid } = req.params;
  
    try {
      if (!movieid) {
        return res.status(404).json({ message: "No movie Found", type: "error" });
      }
      const movieFound = await Movie.findById(movieid);
  
      if (!movieFound) {
        return res.status(404).json({ message: "No movie Found", type: "error" });
      }
      await Cinema.deleteOne({ _id: movieid });
  
      res.status(200).json({ message: "Movie Deleted...", type: "success" })
    } catch (error) {
      return res.status(500).json({ message: error.message, type: "error" });
    }
  };