const mongoose = require('mongoose')
//Schema
const { Schema } = mongoose;
const cinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  movieId:{
      type: Schema.Types.ObjectId,
     ref:'Movie',
     required:true,
    },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  seats: {
    row0: {
      type: Array
    },
    row1: {
      type: Array
    },
    row2: {
      type: Array
    },
    row3: {
      type: Array
    },
    row4: {
      type: Array
    },
    row5: {
      type: Array
    },
    row6: {
      type: Array
    },
    row7: {
      type: Array
    },
    row8: {
      type: Array
    },
    row9: {
      type: Array
    }
  }
});

// Cinema model
const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;