require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const { errorHandler } = require("./middlewares/errorHandlerMiddleware");
const PORT = process.env.API_PORT;

//middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

//routes
app.use("/user", require("./routes/user"));
app.use(errorHandler);

app.listen(PORT, () => console.log("RUNNING"))

