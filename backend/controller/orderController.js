const Order = require("../models/order");
const ErrorHandle = require("../utils/Errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/product");

// create order

const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get single order

const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandle("order not found with this id !", 404));
  }
  res.status(201).json({ success: true, order });
});

// get logged in user order

const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(201).json({ success: true, orders });
});

// get all order ---> Admin

const getAllorders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(201).json({ success: true, totalAmount, orders });
});

// update order status ---> Admin

const updateOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandle("You have aleardy upadted status"));
  }

  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandle("you have already delivered this order !", 400)
    );
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(201).json({ success: true });
});

async function updateStock(id, quantity, next) {
  const productDATA = await Product.findById(id);

  productDATA.stock -= quantity;

  if (productDATA.stock < 0) {
    return next(new ErrorHandle("stock is not available"));
  }

  await productDATA.save();
}

// delete order ----> Admin

const deleteOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandle("order not found with this id !", 404));
  }

  await order.remove();

  res.status(200).json({ success: true, message: "Order Deleted" });
});

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllorders,
  updateOrders,
  deleteOrders,
};
