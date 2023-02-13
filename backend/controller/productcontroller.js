const Product = require("../models/product");
const ErrorHandle = require("../utils/Errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/searchapifeatures");

// create Product

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
});

// get All Product
const getAllProducts = catchAsyncError(async (req, res) => {
  // pagination
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const data = await apiFeature.query;
  res.status(200).json({ success: true, data, productsCount, resultPerPage });
});

// update product by Admin

const updateProducts = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  let data = await Product.findById({ _id: id });
  if (!data) {
    return next(new ErrorHandle("Product not found", 404));
  }
  data = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data });
});

const DeleteProducts = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const data = await Product.findById({ _id: id });
  if (!data) {
    return next(new ErrorHandle("Product not found", 404));
  }

  await data.remove();

  res
    .status(200)
    .json({ success: true, message: "product deleted successfully" });
});

const getOneProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const data = await Product.findById({ _id: id });
  if (!data) {
    return next(new ErrorHandle("Product not found", 404));
  }
  res.status(200).json({ success: true, data });
});

// Create new reviews and update the review

const createProductreview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

// get all reviews of a product

const getProductreviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandle("Product not found !", 404));
  }
  res.status(200).json({ success: true, reviews: product.reviews });
});

// Delete reviews

const deleteReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandle("Product not found !", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;

  const numofReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numofReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({ success: true, message: "review deleted" });
});

module.exports = {
  createProduct,
  getAllProducts,
  updateProducts,
  DeleteProducts,
  getOneProduct,
  createProductreview,
  getProductreviews,
  deleteReviews,
};
