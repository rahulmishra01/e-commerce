const expres = require("express");
const router = expres.Router();
const { isAuthincated } = require("../middleware/authincation");
const {
  processPayment,
  sendstripeApiKey,
} = require("../controller/paymentController");

router.post("/process/payment", isAuthincated, processPayment);
router.get("/stripeapikey", isAuthincated, sendstripeApiKey);
module.exports = router;
