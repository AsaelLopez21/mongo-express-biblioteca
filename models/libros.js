const mongoose = require("mongoose");

const libroSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    autor: {
      type: String,
      required: true,
    },
    anio_publicacion: {
      type: Number,
    },
    genero: {
      type: String,
    },
  },
  { timestamps: true }
);

const Libro = mongoose.model("Libro", libroSchema);
module.exports = Libro;
