document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (!form) return; // Evita errores si el script se carga en otra página sin formulario

  form.addEventListener("submit", function (event) {
    let titulo = document.getElementById("titulo").value.trim();
    let autor = document.getElementById("autor").value.trim();
    let anio = document.getElementById("anio").value.trim();
    let genero = document.getElementById("genero").value.trim();

    // Expresión regular para solo letras y espacios
    let soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    // Verificar que los campos no estén vacíos
    if (!titulo || !autor || !anio || !genero) {
      alert("Todos los campos son obligatorios.");
      event.preventDefault();
      return;
    }

    if (!soloLetras.test(autor)) {
      alert("El autor solo debe contener letras y espacios.");
      event.preventDefault();
      return;
    }

    if (!soloLetras.test(genero)) {
      alert("El género solo debe contener letras y espacios.");
      event.preventDefault();
      return;
    }

    // Validación de año
    let anioNumerico = parseInt(anio, 10);
    let anioActual = new Date().getFullYear();

    if (
      isNaN(anioNumerico) ||
      anioNumerico < -2600 ||
      anioNumerico > anioActual
    ) {
      alert("Ingrese un año de publicación válido.");
      event.preventDefault();
      return;
    }
  });
});
