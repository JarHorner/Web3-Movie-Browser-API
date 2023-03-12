// handle GET requests for [domain]/api/users - return all users
const handleAllMovies = (app, Movie) => {
  app.route("/api/movies").get(async (req, resp) => {
    try {
      // use mongoose to retrieve all books from Mongo
      const movies = await Movie.find();

      resp.status(200).send({
        status: "Success",
        data: movies,
      });
    } catch (e) {
      resp.status(403).send({
        status: "Error",
        data: e,
      });
    }
  });
};

module.exports = {
  handleAllMovies,
};
