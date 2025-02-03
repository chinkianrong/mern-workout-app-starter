require("dotenv").config();

const express = require("express")
const mongoose = require("mongoose")
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")

// Require cors
const cors = require("cors")
// Set up the express app
const app = express()

// Allow requests from all origins (for development only)
app.use(cors())

// Middleware
app.use(express.json())

// Global middleware
// the arrow function will fire for each request that comes in
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
// workoutRoutes is triggered when we make a request to /api/workouts
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
