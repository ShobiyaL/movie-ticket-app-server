const mongoose = require("mongoose");

const dbConnect = async () => {
  const mongoConnectionString = process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongoConnectionString);
    console.log("MongoDB database connection established successfully");
  } catch (error) {
    console.log("Unable to establish connection with the Database", error);
  }
};

module.exports = { dbConnect };