const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
      },
      
      email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('email is invalid');
          }
        },
      },
      password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
          if (value.toLowerCase().includes('password')) {
            throw new Error('Password should not contain word: password');
          }
        },
      },
})

const User = mongoose.model("User", userSchema);
module.exports = User;


// const mongoose = require('mongoose')
// const ShowTime = require('../../models/showTime');

// const { ObjectId } = mongoose.Types;


// to get all show Times

// exports.allShowTime = async(req,res)=>{
//     try{
//     const showTime = await ShowTime.find({})
//     res.json({
//         type:"success",
//         showTime
//     })
//     console.log(showTime)
//     }catch(error){
//         console.log(error)
//     }
//   }
// // To get ShowTime and cinemas based on movie id
// exports.getShowTime = async (req, res, next) => {
//     const { selectedDate } = req.query;
//     const { movieid } = req.params;
//     try {
//       const showTime = await ShowTime.aggregate([
//         {
//           $match: {
//             movieId: ObjectId(`${movieid}`),
//             date: { $eq: new Date(selectedDate) }
//           }
//         },
//         {
//           $lookup: {
//             from: 'cinemas',
//             localField: 'cinemaId',
//             foreignField: '_id',
//             as: 'cinema_details'
//           }
//         },
//         {
//           $unset: ['cinema_details._id']
//         }
//       ]);
//   console.log(showTime)
//       res.status(200).json({
//         type: 'success',
//         showTime
//       });
//     } catch (error){
//       console.log(error)
//     }
//   };

  