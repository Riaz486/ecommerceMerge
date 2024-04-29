// const app = require('./app')

// const connectDatabase = require('./config/database')
// const cloudinary = require("cloudinary")

// // Handling  Uncaught Exception Error

// process.on("uncaughtException", (err) => {
//     console.log(`Error ${err.message}`);
//     console.log(`Shutting Down The Server Due To Uncaught Exception Error`)
//     process.exit(1);
// })



// // config
// // Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//     require("dotenv").config({ path: "config/config.env" });
// }

// // Connecting to Database

// connectDatabase();

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })


// const server = app.listen(process.env.PORT, () => {
//     console.log(`Server is Working  on http://localhost:${process.env.PORT}`)
// });



// //  unhandled Promise Rejection

// process.on("unhandledRejection", err => {
//     console.log(`Error:${err.essage}`);
//     console.log(`shutting down the server due to Unhandled Promise Rejection`)
//     server.close(() => {
//         process.exit(1);
//     })
// })


const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
