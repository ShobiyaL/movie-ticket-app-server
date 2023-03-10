const mongoose = require('mongoose')
const ShowTime = require('../../models/showTime');
// const Cinema = require('../../models/cinema');
const {createCheckoutSession} = require('./CheckOutController');

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


   // To update a showTiming
exports.updateShowTime = async (req, res, next) => {
  try {
    await ShowTime.updateOne(
      { _id: req.body.showTimeId },
      { $push: { reservedSeats: req.body.selectedSeats } }
    );
    
    createCheckoutSession(req, res, next);
  } catch(error) {
    console.log(error);
    res.status(500).json({
      type:"error",
      message:error.message
    })
  }
};