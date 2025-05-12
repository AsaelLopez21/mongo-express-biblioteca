const libroService = require("../services/book-service");

const libroController = {
  getLibros: async (req, res) => {
    try {
      const actualPage = parseInt(req.query.page) || 1;
      const booksPerPage = 10;
      const { titulo, anio_publicacion } = req.query;

      const {
        data,
        totalItems,
        totalPages,
        currentPage,
        hasPreviousPage,
        hasNextPage,
        msg,
      } = await libroService.getDataLibros(
        actualPage,
        booksPerPage,
        titulo,
        anio_publicacion
      );

      if (!msg) {
        return res.render("books/books-list", {
          title: "Lista de libros",
          libro: data,
          currentPage,
          totalPages,
          hasPreviousPage,
          hasNextPage,
        });
      }

      res.render("Error404", {
        title: "Error 404",
        error: msg,
      });
    } catch (error) {
      console.error("Error en getLibros:", error);
      res.status(500).render("Error404", {
        title: "Error 500",
        error: "Error",
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
          mensaje: "Faltan campos",
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
          mensaje: "Año de publicación invalido",
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
        title: "eror",
        error: "Error ",
      });
    }
  },

  getHome: async (req, res) => {
    return res.render("books/home", {
      title: "Pagina Principal biblioteca",
    });
  },

  //!por año de publicacion
  buscarLibrosPorAnio: async (req, res) => {
    try {
      const { anio_publicacion } = req.query;
      const libros = await libroService.getBooksByAnio(anio_publicacion);
      return res.render("books/books-list", {
        title: "Lista de libros por Año de Publicación",
        libro: libros,
      });
    } catch (error) {
      console.error("Error al obtener libros ", error);
      return res.status(500).render("Error404", {
        title: "Error",
        error: "Error ",
      });
    }
  },

  //!buscar por titulo
  buscarLibrosPorTitulo: async (req, res) => {
    try {
      const { titulo } = req.query;
      const libros = await libroService.getBooksByTitulo(titulo);
      return res.render("books/books-list", {
        title: "Lista de libros por titulo",
        libro: libros,
      });
    } catch (error) {
      console.error("Error al obtener libros ", error);
      return res.status(500).render("Error404", {
        title: "Error ",
        error: "Error ",
      });
    }
  },
};

module.exports = libroController;
