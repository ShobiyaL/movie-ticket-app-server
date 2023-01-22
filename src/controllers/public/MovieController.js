const Movie = require('../../models/movie');

exports.GetAllMoviesController = async(req,res)=>{
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

exports.GetMovieOnSearchController = async (req,res)=>{
    const qParams = req.query;
 let searchValue = qParams.q
    try {
     const searchMovie = await Movie.find(
             { title : { $regex:searchValue,$options:"i"}}
     )
     // console.log(searchMovie);
     res.json({ message: "Listed searched movie",type:"success", searchMovie });
    } catch (error) {
     console.log(error)
     res.status(500).json({ message: error.message, type:"error" });
    }
 }

 exports.GetSingleMovieController = async(req,res)=>{
    const { movieid }= req.params;
   
    try {
        if(!movieid){
            return res.status(404).json({message: 'Movie not found',type:"error"})
        }
        const movie = await Movie.findById(movieid);
        
        if(!movie){
            return res.status(404).json({message: 'Movie not found',type:"error"})
        }
        res.json({message:"Fetched Movie",type:"success", movie})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,type:"error"})
    }
}