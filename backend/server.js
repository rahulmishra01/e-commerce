const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const product = require("./routers/productroute");
const user = require("./routers/userroute");
const order = require("./routers/orderroute");
const payment = require("./routers/paymentRoute");
const connectDB = require("./config/database");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
// handling uncaught excepation

process.on("uncaughtException", (err) => {
  console.log(`Error :${err.message}`);
  console.log(`Shutting down due to unhandled promise rejection `);
  process.exit(1);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: "1500mb" }));
app.use(express.urlencoded({ limit: "1500mb", extended: true }));
app.use(fileUpload());
// import Routers
app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
app.use("/api", payment);

// middleware for error
app.use(errorMiddleware);
// connect to database
connectDB();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => res.send("Hello World!"));
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

//unhandle Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error :${err.message}`);
  console.log(`Shutting down due to unhandled promise rejection `);
  server.close(() => {
    process.exit(1);
  });
});
