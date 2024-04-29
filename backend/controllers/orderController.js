const Order = require('../models/orderModel');
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");



// Create Order 

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body;



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
    })
})

//  Get Single Order 

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order Not Found with this Id", 404));

    };
    res.status(200).json({
        success: true,
        order,
    });
})

// user logged in or/  User can See his or her Order 

exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })


    res.status(200).json({
        success: true,
        orders,
    });
})

//  Get All Orders --Admin

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()


    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
})


//  Update Orders Status --Admin

exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        await next(new ErrorHandler("Error Not Found With This Id", 404))
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this Order", 400))
    }
    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }



    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,

    });
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false });
}


// Delete Orders --Admin

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        await next(new ErrorHandler("Error Not Found With This Id", 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,

    });
})