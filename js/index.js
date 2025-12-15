import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";
document.addEventListener("DOMContentLoaded", () => {
  const contenedores = document.querySelectorAll(".contenedor-skins");
  const contenedor = contenedores[0]; // usamos SOLO uno

  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  fetch("./data/productos.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("skins-productos");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
          actualizarContador(obtenerCarrito());
        });

        tarjeta.append(img, titulo, precio, boton);
        contenedor.appendChild(tarjeta);
      });
    });
});
