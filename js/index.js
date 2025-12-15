import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedorBest = document.getElementById("contenedor-best");
  const contenedorCheap = document.getElementById("contenedor-cheapest");


  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  fetch("./data/productos.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al cargar productos");
      }
      return res.json();
    })
    .then((productos) => {
      productos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("skins-productos");

        tarjeta.innerHTML = `
          <img src="./${producto.img}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>$${producto.precio}</p>
          <button class="btn">Agregar al carrito</button>
        `;

        const boton = tarjeta.querySelector("button");
        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
          actualizarContador(obtenerCarrito());
        });


        if (producto.precio >= 1000) {
          contenedorBest.appendChild(tarjeta);
        } else {
          contenedorCheap.appendChild(tarjeta);
        }
      });
    })
    .catch((error) => console.error(error));
});
