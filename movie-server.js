// allows the use of a config file
require("dotenv").config();

const path = require("path");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const passport = require("passport");
const helper = require("./authentication/helpers.js");

// create connection to database
require("./handlers/dataConnector.js").connect();

// create an express app
const app = express();

// stops CORS from blocking the use of the API when hosted
app.use(cors());

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");

// serves up static files from the views folder.

app.use(express.static("public"));

// tell node to use json and HTTP header features in body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(cookieParser("oreos"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use express flash, which will be used for passing messages
app.use(flash());

// set up the passport authentication
require('./authentication/auth.js'); 

// sets up the handlers for each API
const Movie = require("./models/Movie.js");

// use the route handlers for Movie
const movieRouter = require("./handlers/movieRouter.js");
movieRouter.handleRoot(app, Movie);
movieRouter.handleAllMovies(app, Movie);
movieRouter.handleMoviesByAmount(app, Movie);
movieRouter.handleMovieByID(app, Movie);
movieRouter.handleMovieByTMDBID(app, Movie);
movieRouter.handleMoviesByYear(app, Movie);
movieRouter.handleMoviesByRating(app, Movie);
movieRouter.handleMoviesByTitle(app, Movie);
movieRouter.handleMoviesByGenreName(app, Movie);

/*--- in site page requests ----*/

app.get('/home', helper.ensureAuthenticated, (req, res) => {
  res.render('home.ejs', { user: req.user });
 });

// login and logout requests
app.get("/login", (req, res) => {
  res.render("login.ejs", { message: req.flash("error") });
});
app.post("/login", async (req, resp, next) => {
  // use passport authentication to see if valid login
  passport.authenticate("localLogin", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, resp, next);
});
app.get("/logout", (req, resp) => {
  req.logout(() =>{});
  req.flash("info", "You were logged out");
  resp.render("login", { message: req.flash("info") });
});


// customized  404 error
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

const port = 8080;
app.listen(port, () => {
  console.log("Server running at port= " + port);
});
