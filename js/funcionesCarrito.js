import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarrito as vaciarStorage
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();

  carrito.push(producto);

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto agregado");
};

export const eliminarProducto = (index) => {
  const carrito = obtenerCarrito();

  carrito.splice(index, 1);

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto eliminado");
};

export const vaciarCarrito = () => {
  vaciarStorage();
  actualizarContador([]);
  mostrarMensaje("Carrito vaciado");
};
