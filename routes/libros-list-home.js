const express = require("express");
const router = express.Router();
const libroController = require("../controllers/book-controles");
const libroService = require("../services/book-service");

//! Mostrar los libros con paginacion
router.get("/libros/", (req, res) => libroController.getLibros(req, res));

//! Mostrar formulario agregar
router.get("/libros/nuevo", (req, res) =>
  libroController.mostrarFormulario(req, res)
);

//! Procesar formulario de nuevo libro
router.post("/libros/nuevo", async (req, res) => {
  try {
    await libroController.guardarLibro(req, res);
  } catch (error) {
    res.send("ocurrio error",error);
  }
});

//!para editar un libro
router.get("/libros/:id/editar", async (req, res) => {
  const { id } = req.params;
  try {
    const libro = await libroService.getBookById(id);

    if (!libro) {
      return res.redirect("/libros");
    }

    return res.render("books/edit-book", {
      title: "Editar libro",
      libro,
    });
  } catch (err) {
    console.error("error", err);
    return res.send("Error al cargar el libro",error);
  }
});

//!editar libro
router.put("/libros/:id/editar", async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, anio_publicacion, genero } = req.body;

  try {
    const libro = await libroService.getBookById(id);
    if (!libro) {
      return res.redirect("/libros");
    }

    await libroService.updateBook(id, {
      titulo,
      autor,
      anio_publicacion,
      genero,
    });

    return res.redirect("/libros");
  } catch (err) {
    console.error("Error al actualizar el libro:", err);
    return res.send("Error al actualizar el libro");
  }
});

router.get("/libros/:id/eliminar", async (req, res) => {
  const { id } = req.params;

  try {
    const libro = await libroService.getBookById(id);

    if (!libro) {
      return res.redirect("/libros");
    }

    return res.render("books/info-book", {
      title: "Eliminar libro",
      libro,
    });
  } catch (err) {
    console.error("error", err);
    return res.send(error, "Error al cargar el libro" );
  }
});

router.delete("/libros/:id/eliminar", async (req, res) => {
  await libroController.eliminarLibro(req, res);
});

router.get("/", (req, res) => libroController.getHome(req, res));

//!si no encuentra
router.use((req, res) => {
  res.status(404).render("Error404", {
    title: "Error",
  });
});

//!buscar por anio
router.get("/libros/buscar/anio", libroController.buscarLibrosPorAnio);

//!buscar por nombre
router.get("/libros/buscar/titulo", libroController.buscarLibrosPorTitulo);
module.exports = router;
