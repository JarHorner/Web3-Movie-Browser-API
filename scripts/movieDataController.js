const mvoiesData = require("./data-provider.js");

// error messages need to be returned in JSON format
const jsonErrorMessage = (msg) => {
  return { message: msg };
};

const getAll = () => {};

const findMoviesByNumber = (num) => {};

const findMovieByID = (id) => {};

const findMovieByTMDBID = (id) => {};

const findMoviesByYear = (minYear, maxYear) => {};

const findMoviesByRating = (minRating, maxRating) => {};

const findMoviesByTitle = (title) => {};

const findMoviesByGenreName = (name) => {};

module.exports = {
  getAll,
  findMoviesByNumber,
  findMovieByID,
  findMovieByTMDBID,
  findMoviesByYear,
  findMoviesByRating,
  findMoviesByTitle,
  findMoviesByGenreName,
};
