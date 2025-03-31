const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

class libros extends Model {}

libros.init(
  {
    id_libro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.TEXT(100),
      allowNull: false,
      validate: {
        notNull: { msg: "El título es obligatorio" },
        notEmpty: { msg: "El título no puede estar vacío" },
      },
    },
    autor: {
      type: DataTypes.TEXT(100),
      allowNull: false,
      validate: {
        notNull: { msg: "El autor es obligatorio" },
        notEmpty: { msg: "El autor no puede estar vacío" },
      },
    },
    anio_publicacion: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      validate: {
        notNull: { msg: "El año de publicación es obligatorio" },
        isInt: { msg: "El año debe ser un número entero" },
        min: { args: -2600, msg: "El año debe ser mayor a -2600" },
        max: {
          args: new Date().getFullYear(),
          msg: "El año no puede ser futuro",
        },
      },
    },
    genero: {
      type: DataTypes.TEXT(50),
      allowNull: false,
      validate: {
        notNull: { msg: "El género es obligatorio" },
        notEmpty: { msg: "El género no puede estar vacío" },
      },
    },
  },
  {
    sequelize,
    modelName: "libros",
    tableName: "libro",
    timestamps: false,
  }
);

module.exports = libros;
