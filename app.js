var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportLocal = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var app = express();

mongoose.connect("mongodb://localhost:27017/secret", { useUnifiedTopology: true, useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(require("express-session")({
   secret: "Bruce Wayne is the Best",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
   res.render("home");
});

app.get("/secret", function (req, res){
   res.render("secret");
});

app.get("/register", function (req, res) {
   res.render("register");
});

app.listen(3000, function(){
   console.log("Server in localhost:3000");
});