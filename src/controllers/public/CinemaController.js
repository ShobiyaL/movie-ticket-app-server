const Cinema = require('../../models/cinema');
const Movie = require('../../models/movie');

exports.cinemaByCity = async (req,res)=>{
    const {city}= req.params;
    // console.log(city);
    try {
      
      const cinema = await Cinema.find({ city });
        // console.log(cinema[1].name,"theater Name")
      let movies =[];
     
      for(let i=0;i<cinema.length;i++){
        let theater = cinema[i];
        //  console.log(theater,"theater");
         //to get movies
         let movieId= theater.movieId
        //  console.log(movieId,"movieId")
        if(movieId){
          const movie = await Movie.findById(movieId);
          //  console.log("movie name"+movie.title);
          movies.push(movie);
        }
      }
      //  console.log(val,"value")
      res.status(200).json({
        type:'success',
        message: 'Fetched cinema successfully',
        movieData:movies,
        cinemaData:cinema
      });
    } catch(error) {
      res.status(500).json({
        message:"unable to get theater",
        error
      })
    }
  }
//cities...
  exports.cities= async (req,res)=>{
  
    try {
      const cities = await Cinema.find({},{city:1,_id:0});
      console.log(cities);
      res.status(200).json({ 
        cities
      });
    } catch(error) {
      res.status(500).json({
        message:"unable to get theater",
        error
      })
    }
  }