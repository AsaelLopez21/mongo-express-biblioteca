const express = require("express");
const routes = require("./routes");
const morgan = require("morgan");
const path = require("path");
const express_layout = require("express-ejs-layouts");
const app = express();
//para poder usar put y delete en formularios
const methodOverride = require("method-override");
const connectDb = require("./database/database");
app.use(methodOverride("_method"));

// Configuraciones
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
// Conexión a BD
require("dotenv").config();
const port = process.env.PORT || 3000;

connectDb();

// Middleware
app.use(express.urlencoded({ extended: true })); // Para datos de formularios
app.use(express.json()); // Para datos en formato JSON
app.use(express_layout);
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(morgan("combined"));
app.use("/", routes);

app.listen(port, () => {
  console.log(`puerto en: http://localhost:${port}`);
});
