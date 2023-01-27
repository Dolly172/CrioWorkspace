require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const userRoutes = require("./routes/user.routes");
const discussionRoutes = require("./routes/discussion.routes");
const authRoutes = require("./routes/auth.routes");
const mongoose = require("mongoose");

const configurePassport = require("./config/passport");
const passport = require("passport");
configurePassport(passport);


//the above could also had been done as (but the abv one is recommended and is better):
// const strategy = require("./config/passport");
// const passport = require("passport");
// passport.use(strategy);

const DB_URI = "mongodb://127.0.0.1:27017";

const app = express();
const PORT = 8082;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((error) => console.log("Failed to connect to DB\n", error));

app.use(cors({
  origin: "http://15.207.231.44:8081",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  credentials: true,
}));
app.use(express.json());
app.use("/user", userRoutes);
app.use("/discussion", discussionRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server Listening at", PORT);
});
