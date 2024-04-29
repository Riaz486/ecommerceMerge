const ErrorHandler = require("../utils/errorhandler")


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //  Wrong MongoDb Id Error

    if (err.name === "CastError") {
        const message = `Resource not Found, Invalid : ${err.path}`;
        err = new ErrorHandler(message, 400)
    }
    //  Mongoose duplicate key error 
    // ye jo error code aya tha postman par ye 11000 wo code hai 
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400);

    }


    //  Wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is Invalid, Try again`;
        err = new ErrorHandler(message, 400)
    }


    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}