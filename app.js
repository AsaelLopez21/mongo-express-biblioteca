const express = require("express");
const routes = require("./routes");
const morgan = require("morgan");
const path = require("path");
const express_layout = require("express-ejs-layouts");
const app = express();
const sequelize = require("./database/database");
//para poder usar put y delete en formularios
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// Configuraciones
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

// Middleware
app.use(express.urlencoded({ extended: true })); // Para datos de formularios
app.use(express.json()); // Para datos en formato JSON
app.use(express_layout);
app.use("/static", express.static(path.join(__dirname, "static"))); 
app.use("/", routes);
app.use(morgan("combined"));

// Conexión a BD
sequelize
  .sync()
  .then(() => console.log("Tablas sincronizadas"))
  .catch((error) => console.error("Error sincronizando:", error));

app.listen(3000, () => {
  console.log("Servidor http://localhost:3000/libros");
});
