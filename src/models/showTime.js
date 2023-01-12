const mongoose = require('mongoose');

const { Schema } = mongoose;
const showTimeSchema = new Schema({
  startAt: {
    type: String,
    required:true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  reservedSeats:{
     type:Array,
  },
  
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true
  }
});

const ShowTime = mongoose.model('ShowTime', showTimeSchema);

module.exports = ShowTime;
