const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
require("express-async-errors");

const corsOptions = {
  exposedHeaders: "x-auth-token",
};
app.use(cors(corsOptions));
app.use(express.json());

//Routers is added

const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");

//connecting to the Data base
mongoose
  .connect(config.get("db"), { useNewUrlParser: true })
  .then(
    console.log(`Successfully connected to mongodb host${config.get("db")}`)
  )
  .catch((err) => console.log("faile to connect to db...", err));

app.use(helmet());

app.use("/api", users);
app.use("/api", auth);
// app.use(error);

const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`listening to port ${port}`));

module.exports = server;
