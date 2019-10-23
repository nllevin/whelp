const express = require("express");
const mongoose = require("mongoose");
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const bodyParser = require('body-parser');
const passport = require("passport");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("frontend/src/public"));

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));