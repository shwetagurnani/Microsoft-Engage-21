var express = require("express");
var path = require("path");
var favicon = require("static-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var patient = require("./routes/patient");
var student = require("./routes/student")
var faculty = require("./routes/faculty")
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var cors = require("cors");
var fs = require("fs");
const { verifyToken } = require("./middlewares/verifyToken");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
// app.use(express.static(path.join(__dirname, '/build')));

app.use(express.static(path.join(__dirname, "images")));

mongoose
  .connect(
    "mongodb+srv://Shreya:shreya@cluster0.4yhlx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected successfully "))
  .catch((err) => console.log(err));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.options("*", cors());
app.get("/users/autoLogin", verifyToken, (req, res) => {
  res.json({ role: "user" });
});

app.use("/faculty", faculty);
app.use("/student", student);

app.get("/", function (req, res) {
  res.send("hello world");
});

module.exports = app;
