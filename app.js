var express = require("express");
var path = require("path");
var favicon = require("static-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const passport = require("passport");

var routes = require("./routes/index");
var admin = require("./routes/admin");
var api = require("./api/main");

//Создаем приложение Express
//Creating the Express app
var app = express();

//Setting view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(favicon(path.join(__dirname, "/public/images/favicon.ico")));
//app.use(logger('dev'))
app.use(
  logger(
    ":method :url :status :response-time ms - :res[content-length] :date[web]"
  )
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Session configuration
app.use(
  session({
    secret: "AJFN7 58DK7 F9GOR 7854R",
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);

//Setting folder for static serve files
app.use(express.static(path.join(__dirname, "public")));

//Mongoose connection
mongoose
  .connect(keys.MONGO_URI)
  .then(() => console.log("Mongoose connected!"))
  .catch(err => console.log(err));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//Setting routes configuration files
app.use("/", routes); //root routing goes to routes routes/index.js
app.use("/admin", admin); // all /admin/.. goes to routes/admin.js

//Passport middleware function for API
app.use(passport.initialize());

//Passport Strategy configuration
require("./config/passport")(passport);

//API Routes
app.use("/api", api); // all /api/.. goes to api/main.js

/// if all above routes does not catch any matching urls -> catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("Error: " + err + "\nMesssage: " + err.message);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log("Error: " + err + "\nMesssage: " + err.message);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
