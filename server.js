require("dotenv").config();
const express = require("express");
const app = express();
const { errorHandler } = require("./middlewares/errorHandlerMiddleware");
const PORT = process.env.API_PORT;

//middleware
app.use(express.json());

//routes
app.use("/user", require("./routes/user"));
app.use(errorHandler);

app.listen(PORT, () => console.log("RUNNING"))

