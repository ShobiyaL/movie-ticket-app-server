const mongoose = require('mongoose');
require('dotenv').config();

const { ObjectId } = mongoose.Types;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Reservation = require('../../models/reservation');


// To generate a checkout session
exports.createCheckoutSession = async (req, res, next) => {
  const { movie, totalPrice, email,  reservationId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      client_reference_id: reservationId,
      line_items: [
      {
        price_data: {
          currency: 'INR',
          product_data:{
            name:movie,
          },
          unit_amount: totalPrice*100,
        },
        quantity: 1,
      },
    ],
      mode: 'payment',
      success_url: `https://${req.get(
        'host'
      )}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://${req.get('host')}/payment-failure`
    });
    res.status(201).json({
        type:"success",
        message:'success',
      reservationId,
      sessionId: session.id
    });
  } catch(error) {
   console.log(error);
   res.status(500).json({
   type:'error',
   message: error.message
  });
  }
};

// Stripe payment event handler - Check checkout.session.completed event
exports.stripeEventHandler = async (req, res, next) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const sig = req.headers['stripe-signature'];
  let event;

  // Verify stripe signature
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    return res.status(400).json(`Webhook error: ${error.message}`);
  }

  // Handle the payment successfull event and update payment status to 'Success'
  if (event.type === 'checkout.session.completed') {
    const reservationId = event.data.object.client_reference_id;

    try {
      await Reservation.updateOne(
        { _id: ObjectId(reservationId) },
        { $set: { paymentStatus: 'Success' } }
      );
    } catch(error) {
      console.log(error);
      res.status(500).json({
      type:'error',
      message: error.message
     });
     }
  }

  return res.status(200).json({ received: true });
};