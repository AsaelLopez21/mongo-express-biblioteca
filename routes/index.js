const express = require("express");
const librosListRoute = require("./libros-list-home");
const routes = express.Router();

routes.use("/", librosListRoute);

module.exports = routes;
