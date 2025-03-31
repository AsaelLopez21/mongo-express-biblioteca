const libroService = require("../services/book-service");

const libroController = {
  getLibros: async (req, res) => {
    try {
      const actualPage = parseInt(req.query.page) || 1;
      const booksPerPage = 10;

      const {
        data,
        totalItems,
        totalPages,
        currentPage,
        hasPreviousPage,
        hasNextPage,
      } = await libroService.getDataLibros(actualPage, booksPerPage);

      if (!data.msg) {
        return res.render("books/books-list", {
          title: "Lista de libros",
          libro: data,
          currentPage,
          totalPages,
          hasPreviousPage,
          hasNextPage,
        });
      }

      return res.render("Error404", {
        title: "Error 404",
        error: data.msg,
      });
    } catch (error) {
      console.error("Error en getLibros:", error);
      res.status(500).render("Error404", {
        title: "Error 500",
        error: "Error interno del servidor",
      });
    }
  },
  mostrarFormulario: (req, res) => {
    return res.render("books/add-book", {
      title: "Agregar Nuevo Libro",
    });
  },
  guardarLibro: async (req, res) => {
    try {
      const { titulo, autor, anio_publicacion, genero } = req.body;

      if (!titulo || !autor || !anio_publicacion || !genero) {
        return res.render("books/add-book", {
          title: "Agregar Nuevo Libro",
          mensaje: "Todos los campos son obligatorios",
          tipoMensaje: "error",
        });
      }

      if (
        isNaN(anio_publicacion) ||
        anio_publicacion <= -2600 ||
        anio_publicacion > new Date().getFullYear()
      ) {
        return res.render("books/add-book", {
          title: "Agregar Nuevo Libro",
          mensaje: "Año de publicación inválido",
          tipoMensaje: "error",
        });
      }

      await libroService.createBook({
        titulo,
        autor,
        anio_publicacion,
        genero,
      });

      return res.render("books/add-book", {
        title: "Agregar Nuevo Libro",
        mensaje: "Libro agregado correctamente",
        tipoMensaje: "success",
      });
    } catch (error) {
      return res.render("books/add-book", {
        title: "Agregar Nuevo Libro",
        mensaje: "Error al guardar el libro",
        tipoMensaje: "error",
      });
    }
  },
  
  eliminarLibro: async (req, res) => {
    try {
      const { id } = req.params;

      await libroService.deleteBook(id);

      return res.redirect("/libros");
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      return res.status(500).render("Error404", {
        title: "Error 500",
        error: "Error interno del servidor",
      });
    }
  },
};

module.exports = libroController;
