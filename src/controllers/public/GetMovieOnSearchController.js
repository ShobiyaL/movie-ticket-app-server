const Movie = require('../../models/movie');

const GetMovieOnSearchController = async (req,res)=>{
   const qParams = req.query;
//    const searchTerm = qParams.search.charAt(0).toUpperCase() + qParams.search.slice(1); 
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

module.exports=GetMovieOnSearchController;
