const express = require("express");
const router = express.Router();
const libroController = require("../controllers/book-controles");
const libroService = require("../services/book-service");

router.get("/libros/", (req, res) => libroController.getLibros(req, res));
router.get("/libros/nuevo", (req, res) =>
  libroController.mostrarFormulario(req, res)
);
router.post("/libros/nuevo", async (req, res) => {
  try {
    await libroController.guardarLibro(req, res);
  } catch (error) {
    res.status(500).send({ error: "Ocurrió un error" });
  }
});

router.get("/libros/:id(\\d+)/editar", async (req, res) => {
  const { id } = req.params;
  console.log("recibiendo:", id);
  console.log(req.params);
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
    console.log("error", error);
    return res.status(500).send({ error: "Error al cargar el libro" });
  }
});

router.put("/libros/:id(\\d+)/editar", async (req, res) => {
  const { id } = req.params; // Toma el ID desde la URL
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

    return res.redirect("/libros"); // Redirige a la lista de libros después de actualizar
  } catch (err) {
    console.error("Error al actualizar el libro:", err);
    return res.status(500).send("Error al actualizar el libro");
  }
});

router.get("/libros/:id(\\d+)/eliminar", async (req, res) => {
  const { id } = req.params;

  try {
    const libro = await libroService.getBookById(id);

    if (!libro) {
      return res.redirect("/libros");
    }

    return res.render("books/info-book", {
      title: "Editar libro",
      libro,
    });
  } catch (err) {
    console.log("error", error);
    return res.status(500).send({ error: "Error al cargar el libro" });
  }
});

router.delete("/libros/:id/eliminar", async (req, res) => {
  await libroController.eliminarLibro(req, res);
});

router.use((req, res) => {
  res.status(404).render("Error404", {
    title: "Error",
  });
});

module.exports = router;
