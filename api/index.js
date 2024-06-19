// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("../config/db");

// dotenv.config();

// // Initialize Express app
// const app = express();
// // Middleware
// app.use(cors());
// app.use(express.json()); // For parsing application/json

// // Connect to MongoDB
// let db;
// connectDB().then((database) => {
//   db = database;
//   console.log("Database connection established.");
// });

// async function run() {
//   const sampleMoviesCollection = db.collection("movies");
//   const sampleUsersCollection = db.collection("users");
//   try {
//     // get movies data
//     app.get("/movies", async (req, res) => {
//       try {
//         const query = {};
//         const result = await sampleMoviesCollection
//           .find(query)
//           .limit(100)
//           .toArray();
//         res.status(200).json({
//           status: "ok",
//           message: "get movies data successfully",
//           total: result?.length,
//           data: result,
//         });
//         console.log(result);
//       } catch (error) {
//         res.status(500).json({
//           status: "failed",
//           message: error?.message,
//           total: result?.length,
//         });
//         console.log(error.message);
//       }
//     });
//     // get movies data
//     app.get("/users", async (req, res) => {
//       try {
//         const query = {};
//         const result = await sampleUsersCollection
//           .find(query)
//           // .limit(100)
//           .toArray();
//         res.status(200).json({
//           status: "ok",
//           message: "get movies data successfully",
//           total: result?.length,
//           data: result,
//         });
//         console.log(result);
//       } catch (error) {
//         console.log(error.message);
//       }
//     });
//   } finally {
//   }
// }
// run();
// // .catch(console.dir);

// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.listen(5000, () => console.log("Server ready on port 5000."));

// module.exports = app;

// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
let db;
connectDB().then((database) => {
  db = database;
  console.log("Database connection established.");
});

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Example route to fetch data from MongoDB
app.get("/movies", async (req, res) => {
  try {
    const collection = db.collection("movies");
    const data = await collection.find({}).limit(100).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
