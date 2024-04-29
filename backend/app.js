// const express = require('express');
// const cors = require('cors')
// const cookieParser = require('cookie-parser')
// const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
// const path = require("path")


// // Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//     require("dotenv").config({ path: "config/config.env" });
// }

// // Error Handling 
// const errorMiddleware = require("./middleware/error")





// const app = express()
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// // app.use(cors({ origin: true, credentials: true })); 

// // Enable CORS with a list of allowed origins
// app.use(
//     cors({
//       origin: [
//         'http://localhost:3000', // Your local development server
//         'https://ecommerce-frontend-git-main-riaz486.vercel.app', // Your live frontend URL
//       ],
//       credentials: true, // Allow cookies to be sent
//     })
//   );



// //  Route Import
// const product = require("./routes/productRoute");
// const user = require("./routes/userRoute")

// const order = require('./routes/orderRoute')
// const payment = require('./routes/paymentRoute')
// app.get("/", (req, res) => res.send("working:"));
// app.use('/api/v1', product);
// app.use('/api/v1', user);
// app.use('/api/v1', order);
// app.use('/api/v1', payment);

// // app.use(express.static(path.join(__dirname, "../frontend/build")));

// // app.get("*", (req, res) => {
// //     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// // });

// // Middleware For Error Handling
// app.use(errorMiddleware)


// module.exports = app


const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");


const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
