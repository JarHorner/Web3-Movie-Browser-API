require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
// serves up static files from the views folder. 
app.use(express.static('views')); 
// also add a path to views 
app.use('/static', express.static('views')); 

const Movie = require("./models/Movie.js");
const User = require("./models/User.js");

// tell node to use json and HTTP header features in body-parser
app.use(express.urlencoded({ extended: true }));

// use the route handlers
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

// use the route handlers
const userRouter = require("./handlers/userRouter.js");
userRouter.handleAllUsers(app, User);

// create connection to database
require("./handlers/dataConnector.js").connect();

app.use(function (req, res, next) { 
    res.status(404).send("Sorry can't find that!") 
   }); 

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running at port= " + port);
});
