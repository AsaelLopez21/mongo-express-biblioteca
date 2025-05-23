const Libro = require("../models/libros");

const libroService = {
  //!obtener libros
  getDataLibros: async (pagina = 1, limite = 10, titulo, anio_publicacion) => {
    try {
      //!manejar paginacion
      const salto = (pagina - 1) * limite;

      //!crear filtro
      const filtro = {};

      //!buscar titulo y año
      if (titulo) filtro.titulo = titulo;
      if (anio_publicacion) filtro.anio_publicacion = anio_publicacion;

      const libros = await Libro.find(filtro).skip(salto).limit(limite);
      const total = await Libro.countDocuments(filtro);

      return {
        data: libros,
        currentPage: pagina,
        totalPages: Math.ceil(total / limite),
      };
    } catch (error) {
      return { msg: error.message, data: [] };
    }
  },

  //! Crear un nuevo libro
  createBook: async (bookData) => {
    try {
      const newBook = await Libro.create(bookData);
      return newBook;
    } catch (error) {
      throw error;
    }
  },

  //!obtener por ID
  getBookById: async (id) => {
    try {
      const libro = await Libro.findById(id);
      return libro;
    } catch (err) {
      throw err;
    }
  },

  //!actualizar por id
  updateBook: async (id, bookData) => {
    try {
      const libro = await Libro.findById(id);
      if (!libro) {
        throw new Error("Libro no encontrado");
      }

      await libro.updateOne(bookData);
      return libro;
    } catch (error) {
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      const libro = await Libro.findById(id);
      if (!libro) {
        throw new Error("Libro no encontrado");
      }

      await libro.deleteOne();
      return { message: "Libro eliminado correctamente" };
    } catch (error) {
      throw error;
    }
  },
  //!obtener por año
  getBooksByAnio: async (anio_publicacion) => {
    try {
      const libros = await Libro.find({ anio_publicacion });
      return libros;
    } catch (error) {
      throw error;
    }
  },

  //!obtener por titulo
  getBooksByTitulo: async (titulo) => {
    try {
      const libros = await Libro.find({ titulo: new RegExp(titulo, "i") }); // Búsqueda insensible a mayúsculas/minúsculas
      return libros;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = libroService;
