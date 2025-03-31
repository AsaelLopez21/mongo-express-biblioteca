const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("biblioteca", "root", "nova", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
});

sequelize
  .authenticate()
  .then(() => console.log("conectado"))
  .catch((error) => console.log({ 'error':error }));

module.exports = sequelize;
