const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const Reservation = require('../../models/reservation');
const {updateShowTime} = require("./ShowTimeController")

// To create a reservation
exports.createReservation = async (req, res, next) => {
    req.body.date = new Date(req.body.date);
    try {
      const reservation = new Reservation(req.body);
      await reservation.save();
  
      // Update reserved seats in showTiming collection for this specific show
      req.body.reservationId = reservation._id.toString();
      updateShowTime(req, res, next);
    } catch(error) {
     console.log(error);
     res.status(500).json({
        type:"error",
        message:error.message
     })
    }
  };

  // To get all reservations of a user
exports.getAllReservations = async (req, res, next) => {
    const { startAt, screenId, date } = req.query;
    try {
      const reservations = await Reservation.find({
        startAt: { $eq: startAt },
        screenId: { $eq: screenId },
        date: new Date(date)
      }).exec();
      res.status(200).json({
        type: 'success',
        message:"success",
        reservations
      });
    } catch(error) {
        console.log(error);
        res.status(500).json({
           type:"error",
           message:error.message
        })
       }
  };
  
  // To get reservation based on checkout session id
  exports.getReservation = async (req, res, next) => {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
  
    try {
      const reservation = await Reservation.findById(
        ObjectId(session.client_reference_id)
      );
      res.status(200).json({
        type:"success",
        message:"success",
        reservation
      });
    } catch(error) {
        console.log(error);
        res.status(500).json({
           type:"error",
           message:error.message
        })
       }
  };