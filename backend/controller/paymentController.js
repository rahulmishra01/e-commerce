const catchAsynErrors = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const processPayment = catchAsynErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentInternets.create({
    amount: req.body.amount,
    currency: "inr",
    metaData: {
      company: "ECOMMERCE",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

const sendstripeApiKey = catchAsynErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

module.exports = { processPayment, sendstripeApiKey };
