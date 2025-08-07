const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes")
const passport = require("passport");
require("./middlewares/passport");

dotenv.config();
const PORT = process.env.PORT || 5000; // Define the port

database.connect();

//middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

//routes
app.use("/auth", userRoutes);
app.use("", todoRoutes);

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
