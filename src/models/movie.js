const mongoose = require('mongoose');

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide movie title'],
    trim: true,
    
  },
  image: {
    type: String,
    required: [true, 'Please provide movie image']
  },
  
  genre: {
    type: String,
    required: [true, 'Please provide movie genre'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Please provide duration']
  },
  director: {
    type: String,
    trim: true,
    

  },
  cast: {
    type: String,
    trim: true
  },
  description: {
      type: String,
      required: [true, 'Please provide description']
  },
  language: {
    type: String
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please provide movie release date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide movie end date']
  }
});

// Movie model
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
