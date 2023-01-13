const mongoose = require('mongoose')
const ShowTime = require('../../models/showTime');

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
    }
  }
// To get ShowTime and cinemas based on movie id
exports.getShowTime = async (req, res, next) => {
    const { selectedDate } = req.query;
    const { movieid } = req.params;
    try {
      const showTime = await ShowTime.aggregate([
        {
          $match: {
            movieId: ObjectId(`${movieid}`),
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
      ]);
  console.log(showTime)
      res.status(200).json({
        type: 'success',
        showTime
      });
    } catch (error){
      console.log(error)
    }
  };

  