const mongoose = require('mongoose')
const ShowTime = require('../../models/showTime');
// const Cinema = require('../../models/cinema');

const { ObjectId } = mongoose.Types;
// to get all show Times

exports.allShowTime = async(req,res)=>{
    try{
    const showTime = await ShowTime.find({})
    res.json({
        type:"success",
        showTime
    })
    console.log(showTime)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: error.message, type:"error" });
    }
  }

// // To get ShowTime and cinemas based on movie id
exports.getShowTime = async (req, res) => {
    const { selectedDate } = req.query;
    const { movieId } = req.params;
    try {
      const showTime = await ShowTime.aggregate([
        {
          $match: {
            movieId: ObjectId(`${movieId}`),
            date: { $eq: new Date(selectedDate) }
          }
        },
        {
          $lookup: {
            from: 'cinemas',
            localField: 'cinemaId',
            foreignField: '_id',
            as: 'cinema_details'
          }
        },
        {
          $unset: ['cinema_details._id']
        }
      ])
  console.log(showTime)
      res.status(200).json({
        type: 'success',
        showTime
      });
    } catch (error){
      console.log(error)
    }
  };

//get show time by cinemaId
exports.getShowTimeByCinemaId = async(req,res)=>{
    const {cinemaId} = req.params;
    console.log("cinemaId"+cinemaId);
    // let date = new Date(selectedDate);
    try {
        const showTime = await ShowTime.find({cinemaId});
        console.log(showTime);
        res.json({
            type:"success",
            showTime
        })
    } catch (error) {
        console.log(error)
    }
}

//get show time by movieId
// exports.getShowTimeByMovieId = async(req,res)=>{
//     const {movieId} = req.params;
//     const {selectedDate}= req.query;
//      let date =  new Date(selectedDate);
//     try {
//         const showTime = await ShowTime.find({movieId,date});
//         console.log("checking after creating st in the prod"+showTime);
//         res.json({
//             selectedDate,
//             date,
//             type:"success",
//             showTime
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// to get showTime and cinemas based on movie id
// exports.getShowTime = async (req,res)=>{
//     const { selectedDate } = req.query;
//     let date = new Date(selectedDate);
//     const { movieId } = req.params;
//     console.log(movieId)
//     try {
//         const showTime = await ShowTime.find({movieId,date });
//           console.log(showTime);
//         let cinema_id = showTime.map((value,index) =>{
//             return value.cinemaId;
//         })
//         // console.log(cinema_id);
//         let cinema_details=[];
//         for (let i=0;i<cinema_id.length;i++){
//             if(cinema_id){
//                 const cinema_dets = await Cinema.findById(cinema_id,{_id:0});
//                 cinema_details.push(cinema_dets);
//             }
//         }
// //  console.log(cinema_details);
//          res.status(200).json({
//             type: 'success',
//             message:"success",
//             showTime,
//             cinemaData: cinema_details
//           });
//     } catch (error) {

//         console.log(error);
//         res.status(500).json({ message: error.message, type:"error" });
//     }
// }

  