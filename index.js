const path = require("path");
const express = require("express");

const app = express();

// customize the 404 error with our own middleware function
app.use(function (req, res, next) {
    res.status(404).send("Sorry, there is nothing here!");
  });
  
  let port = 8080;
  app.listen(port, function () {
    console.log("Server running at port= " + port);
  });