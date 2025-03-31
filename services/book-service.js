const Libros = require("../models/libros");

const libroService = {
  getDataLibros: async (actualPage = 1, booksPerPage = 10) => {
    try {
      const pos = (actualPage - 1) * booksPerPage;

      const { count, rows } = await Libros.findAndCountAll({
        offset: pos,
        limit: booksPerPage,
        order: [["id_libro", "ASC"]],
      });

      return {
        data: rows,
        totalItems: count,
        currentPage: actualPage,
        totalPages: Math.ceil(count / booksPerPage),
        hasPreviousPage: actualPage > 1,
        hasNextPage: actualPage < Math.ceil(count / booksPerPage),
      };
    } catch (error) {
      return { msg: error.message, data: [] };
    }
  },
  createBook: async (bookData) => {
    // console.log("hola soy el servicio");
    try {
      const newBook = await Libros.create(bookData);
      return newBook;
    } catch (error) {
      // console.log("hola soy el error en el servicio");

      throw error;
    }
  },
  getBookById: async (id_libro) => {
    // console.log("id libro recivo", id_libro);
    try {
      const libro = await Libros.findByPk(id_libro);
      return libro;
    } catch (err) {
      throw err;
    }
  },
  updateBook: async (id_libro, bookData) => {
    try {
      const libro = await Libros.findByPk(id_libro);
      if (!libro) {
        throw new Error("Libro no encontrado");
      }

      await libro.update(bookData);
      return libro;
    } catch (error) {
      throw error;
    }
  },
  deleteBook: async (id_libro) => {
    try {
      const libro = await Libros.findByPk(id_libro);
      if (!libro) {
        throw new Error("Libro no encontrado");
      }

      await libro.destroy();
      return { message: "Libro eliminado correctamente" };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = libroService;
