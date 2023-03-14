// error messages need to be returned in JSON format
const jsonErrorMessage = (msg) => {
  return { message: msg };
};

// handle GET requests for [domain]/api/movies - return all movies
const handleRoot = (app, Movie) => {
  app.route("/").get(async (req, resp) => {
    try {
        resp.json({
          message: "This is the Movie Browser API! the following are calls you can make:",
          AllMovies: "[domain]/api/movies",
          MoviesByAmount: "[domain]/api/movies/limit/150",
          MovieByID:"[domain]/api/movie/13",
          MovieByTMDBID: "[domain]/api/movie/tmdb/14",
          MoviesByYear: "[domain]/api/movies/year/1980/2000",
          MoviesByRating: "[domain]/api/movies/rating/7/8",
          MoviesByTitle: "[domain]/api/movies/title/Jarhead",
          MoviseByGenreName: "[domain]/api/movies/genre/Drama",
        });
    } catch (e) {
      jsonErrorMessage(e);
    }
  });
};

// handle GET requests for [domain]/api/movies - return all movies
const handleAllMovies = (app, Movie) => {
  app.route("/api/movies").get(async (req, resp) => {
    try {
      const movies = await Movie.find();

      if (movies.length) {
        resp.json(movies);
      } else {
        resp.json({
          message: "Movies were unable to be fetched.",
          example: "[domain]/api/movies",
        });
      }
    } catch (e) {
      jsonErrorMessage(e);
    }
  });
};

// handle requests for a specifc amount of movies (must be from 1 to 200):
// e.g., [domain]/api/movies/limit/150
const handleMoviesByAmount = (app, Movie) => {
  app.route("/api/movies/limit/:num").get(async (req, resp) => {
    try {
      let movies;
      if (req.params.num < 1 || req.params.num > 200) {
        movies = [];
      } else {
        movies = await Movie.find().limit(req.params.num);
      }

      if (movies.length) {
        resp.json(movies);
      } else {
        resp.json({
          message: `Number of movies ${req.params.num} is either to low or high. Number must be between 1 and 200.`,
          example: "[domain]/api/movies/limit/150",
        });
      }
    } catch (e) {
      jsonErrorMessage(e);
    }
  });
};

// handle requests for specific movie by its id: e.g., [domain]/api/movie/13
const handleMovieByID = (app, Movie) => {
  app.route("/api/movies/:id").get(async (req, resp) => {
    try {
      const movie = await Movie.find({ id: req.params.id });

      if (movie.length) {
        resp.json(movie);
      } else {
        resp.json({
          message: `No movie with the ID ${req.params.id} found.`,
          example: "[domain]/api/movie/13",
        });
      }
    } catch (e) {
      jsonErrorMessage(e);
    }
  });
};

// handle requests for specific movie by its tmdb id: e.g., [domain]/api/movie/tmdb/14
const handleMovieByTMDBID = (app, Movie) => {
  app.route("/api/movies/tmdb/:id").get(async (req, resp) => {
    try {
      const movie = await Movie.find({ tmdb_id: req.params.id });

      if (movie.length) {
        resp.json(movie);
      } else {
        resp.json({
          message: `No movie with the TMDB ID ${req.params.id} not found.`,
          example: "[domain]/api/movie/tmdb/14",
        });
      }
    } catch (e) {
      jsonErrorMessage(e);
    }
  });
};

// handle requests for movies with specific year ranges:
// e.g., [domain]/api/movies/year/1980/2000
const handleMoviesByYear = (app, Movie) => {
  app.route("/api/movies/year/:min?/:max?").get(async (req, resp) => {
    try {
      const movies = await Movie.find();


      let filteredMovies;
      if (req.params.min && req.params.max) {
        filteredMovies = movies.filter((movie) => {
          return (
            parseInt(movie.release_date.split("-")[0]) <=
              parseInt(req.params.max) &&
            parseInt(movie.release_date.split("-")[0]) >=
              parseInt(req.params.min)
          );
        });
      } else {
        resp.json({
            message:
              `There must be a min and a max parameter.` +
              ` Make sure min value is less than the max and the max value is greater than the min.`,
            example: "[domain]/api/movies/year/1980/2000",
          });
      }
      //   else if (req.params.min && !req.params.max) {
      //     filteredMovies = movies.filter((movie) => {
      //         return (
      //           parseInt(movie.release_date.split("-")[0]) >= parseInt(req.params.min)
      //         );
      //       });
      //   } else if (req.params.min === 0 && req.params.max) {
      //     filteredMovies = movies.filter((movie) => {
      //         return (
      //           parseInt(movie.release_date.split("-")[0]) <= parseInt(req.params.max)
      //         );
      //       });
      //   }

      if (filteredMovies.length) {
        resp.json(filteredMovies);
      } else {
        resp.json({
          message:
            `Movies between years ${req.params.min} and ${req.params.max} not found.` +
            ` Make sure min value is less than the max and the max value is greater than the min.`,
          example: "[domain]/api/movies/year/1980/2000",
        });
      }
    } catch (e) {
      jsonErrorMessage(e);
    }
  });
};

// handle requests for movies with specific rating ranges:
// e.g., [domain]/api/movies/rating/7/8
const handleMoviesByRating = (app, Movie) => {
  app.route("/api/movies/ratings/:min/:max").get(async (req, resp) => {
    try {
      const movies = await Movie.find()
        .where("ratings.average")
        .gte(req.params.min)
        .lte(req.params.max);

      if (movies.length) {
        resp.json(movies);
      } else {
        resp.json({
          message:
            `Movies with ratings between ${req.params.min} and ${req.params.max} not found.` +
            ` Make sure min value is less then the max and the max value is greater then the min.`,
          example: "[domain]/api/movies/rating/7/8",
        });
      }
    } catch (e) {
      jsonErrorMessage(e);
    }
  });
};

// handle requests for specific movies whose title contains the provided text:
// e.g., [domain]/api/movies/title/Jarhead
const handleMoviesByTitle = (app, Movie) => {
  app.route("/api/movies/title/:text").get(async (req, resp) => {
    try {
      const movies = await Movie.find({
        title: new RegExp(req.params.text, "i"),
      });

      if (movies.length) {
        resp.json(movies);
      } else {
        resp.json({
          message: `No movies found with ${req.params.text} in the title.`,
          example: "[domain]/api/movies/title/Jarhead",
        });
      }
    } catch (e) {
      jsonErrorMessage(e);
    }
  });
};

// handle requests for specific movies whose genre matches the provided name:
// e.g., [domain]/api/movies/genre/Drama
const handleMoviesByGenreName = (app, Movie) => {
  app.route("/api/movies/genre/:name").get(async (req, resp) => {
    try {
      const movie = await Movie.find({
        "details.genres.name": new RegExp(req.params.name, "i"),
      });

      if (movie.length) {
        resp.json(movie);
      } else {
        resp.json({
          message: `No movies with the genre ${req.params.name} found.`,
          example: "[domain]/api/movies/genre/Drama",
        });
      }
    } catch (e) {
      jsonErrorMessage(e);
    }
  });
};

module.exports = {
  handleAllMovies,
  handleMoviesByAmount,
  handleMovieByID,
  handleMovieByTMDBID,
  handleMoviesByYear,
  handleMoviesByRating,
  handleMoviesByTitle,
  handleMoviesByGenreName,
};
