require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Connect to the MongoDB database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const db = mongoose.connection;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection events
db.on("error", (err) => console.log(err));
db.on("open", () => console.log("DATABASE CONNECTED"));

// Routes
const tasksRouter = require("./routes/tasks");
app.use("/api/tasks", tasksRouter);

// Start the server
app.listen(process.env.PORT, () => console.log(`Server is listening at port ${process.env.PORT}`));
