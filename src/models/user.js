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


