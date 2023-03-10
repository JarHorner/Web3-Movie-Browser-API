/* Module for handling specific api requests/routes for movie data  */

// error messages need to be returned in JSON format
const jsonErrorMessage = (msg) => {
  return { message: msg };
};

const handleAllMovies = (app, controller) => {
  app.get("/api/movies", (req, resp) => {
    const data = controller.getAll();
    resp.json(data);
  });
};

const handleNumberMovies = (app, controller) => {
  app.get("/api/movies/limit/:num", (req, resp) => {
    const data = controller.findMoviesByNumber(req.params.num);
    if (data) {
      resp.json(data);
    } else {
      resp.json(jsonMessage(`Number of movies ${req.params.num} is either to low or high. Number must be between 1 and 200.`));
    }
  });
};

const handleMovieByID = (app, controller) => {
  app.get("/api/movies/:id", (req, resp) => {
    const data = controller.findMovieByID(req.params.id);
    if (data) {
      resp.json(data);
    } else {
      resp.json(jsonMessage(`ID ${req.params.id} not found`));
    }
  });
};

const handleMovieByTMDBID = (app, controller) => {
  app.get("/api/movies/tmdb/:id", (req, resp) => {
    const data = controller.findMovieByTMDBID(req.params.id);
    if (data) {
      resp.json(data);
    } else {
      resp.json(jsonMessage(`TMDB ID ${req.params.id} not found`));
    }
  });
};

const handleMovieByYear = (app, controller) => {
  app.get("/api/movies/year/:min/:max", (req, resp) => {
    const data = controller.findMoviesByYear(req.params.min, req.params.max);
    if (data) {
      resp.json(data);
    } else {
      resp.json(jsonMessage(`Movies between years ${req.params.min} and ${req.params.max} not found`));
    }
  });
};

const handleMovieByRating = (app, controller) => {
  app.get("/api/movies/ratings/:min/:max", (req, resp) => {
    const data = controller.findMoviesByRating(req.params.min, req.params.max);
    if (data) {
      resp.json(data);
    } else {
      resp.json(jsonMessage(`Movies with ratings between ${req.params.min} and ${req.params.max} not found`));
    }
  });
};

const handleMovieByTitle = (app, controller) => {
  app.get("/api/movies/title/:text", (req, resp) => {
    const data = controller.findMoviesByTitle(req.params.text);
    if (data) {
      resp.json(data);
    } else {
      resp.json(jsonMessage(`No movies found with ${req.params.text} within there title.`));
    }
  });
};

const handleMovieByGenreName = (app, controller) => {
  app.get("/api/movies/genre/:name", (req, resp) => {
    const data = controller.findMoviesByGenreName(req.params.name);
    if (data) {
      resp.json(data);
    } else {
      resp.json(jsonMessage(`No movies with genre ${req.params.name} found`));
    }
  });
};

module.exports = {
  handleAllMovies,
  handleNumberMovies,
  handleMovieByID,
  handleMovieByTMDBID,
  handleMovieByYear,
  handleMovieByRating,
  handleMovieByTitle,
  handleMovieByGenreName,
};
