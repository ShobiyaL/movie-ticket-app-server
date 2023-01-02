const Movie = require('../../../models/movie');

const CreateMovieController = async(req,res)=>{
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

module.exports= CreateMovieController;