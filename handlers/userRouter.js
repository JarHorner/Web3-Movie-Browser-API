// handle GET requests for [domain]/api/users - return all users
const handleAllUsers = (app, User) => {
  app.route("/api/users").get(async (req, resp) => {
    try {
      // use mongoose to retrieve all books from Mongo
      const users = await User.find();

      resp.status(200).send({
        status: "Success",
        data: users,
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
  handleAllUsers,
};
