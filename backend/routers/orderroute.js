const express = require("express");
const router = express.Router();

const orderSchema = require("../controller/orderController");
const { isAuthincated, authorizeRoles } = require("../middleware/authincation");
router.post("/order/new", isAuthincated, orderSchema.newOrder);
router.get("/order/:id", isAuthincated, orderSchema.getSingleOrder);
router.get("/orders/me", isAuthincated, orderSchema.myOrders);
router.get("/admin/orders", isAuthincated, authorizeRoles("admin"), orderSchema.getAllorders);
router.put("/admin/order/:id", isAuthincated, authorizeRoles("admin"), orderSchema.updateOrders);
router.delete("/admin/order/:id", isAuthincated, authorizeRoles("admin"), orderSchema.deleteOrders);
module.exports = router;
