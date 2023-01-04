const Movie = require('../../models/movie');

const GetSingleMovieController = async(req,res)=>{
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

module.exports = GetSingleMovieController; 