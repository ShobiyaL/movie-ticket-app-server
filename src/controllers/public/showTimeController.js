const mongoose = require('mongoose')
const ShowTime = require('../../models/showTime')

const { ObjectId } = mongoose.Types;
//  To get showTime and theater based on movie id

exports.getShowTime = async (req, res) => {
    const { selectedDate } = req.query;
     console.log(selectedDate)
    const { movieid } = req.params;
     console.log(movieid);
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
//   console.log(showTime);
      res.status(200).json({
        type:'Success',
        message: 'success',
        showTime
      });
    } catch(error) {
        console.log(error)
      res.status(500).json({
          message: 'failure',
          type:"error"
        });
      
    }
  };