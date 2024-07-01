// JS del carrito
document.querySelector('#cart-btn').onclick = () => {
    document.querySelector('.shopping-cart').classList.add('active');
}

document.querySelector('.cerrar-carrito').onclick = () => {
    document.querySelector('.shopping-cart').classList.remove('active');
}

const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const cuerpoCarrito = document.querySelector('#lista-carrito tbody');
const mensajeVacio = document.querySelector('#carrito-vacio');
const tablaCarrito = document.querySelector('#lista-carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const pedirWhatsapp = document.querySelector('#pedir-whatsapp');
const cartCount = document.querySelector('#cart-count');
const totalPagar = document.querySelector('#total-pagar');
const carritoTotal = document.querySelector('.carrito-total');
let articulosCarrito = [];

document.addEventListener('DOMContentLoaded', cargarCarritoLocalStorage);
cargarEventListeners();

function cargarEventListeners() {
    actualizarVistaCarrito();
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        actualizarContadorCarrito();
        carritoHTML();
        actualizarVistaCarrito();
        guardarCarritoLocalStorage(); // Guardar en `localStorage`
    });
}

function agregarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(productoSeleccionado);
        actualizarVistaCarrito();
        guardarCarritoLocalStorage(); // Guardar en `localStorage`
    }
}

function leerDatos(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('.producto-nombre').textContent,
        precio: parseFloat(producto.querySelector('.producto-precio').textContent.replace('$', '')),
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    
    if (existe) {
        const productos = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        articulosCarrito = [...productos];
    } else {
        articulosCarrito = [...articulosCarrito, infoProducto];
    }
    
    actualizarContadorCarrito();
    carritoHTML();
}

function carritoHTML() {
    limpiarHTML();

    articulosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width="60">
        </td>
        <td>
            ${producto.nombre}
        </td>
        <td>
            $${producto.precio.toFixed(2)}
        </td>
        <td>
            ${producto.cantidad}
        </td>
        <td>
            <a class="borrar-producto" data-id="${producto.id}">X</a>
        </td>
        `;

        cuerpoCarrito.appendChild(row);
    });

    actualizarTotal();
}

function limpiarHTML() {
    while (cuerpoCarrito.firstChild) {
        cuerpoCarrito.removeChild(cuerpoCarrito.firstChild);
    }
}

function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');
        const producto = articulosCarrito.find(producto => producto.id === productoId);

        if (producto.cantidad > 1) {
            producto.cantidad--;
        } else {
            articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        }

        carritoHTML();
        actualizarContadorCarrito();
        actualizarVistaCarrito();
        guardarCarritoLocalStorage(); // Guardar en `localStorage`
    }
}

function actualizarContadorCarrito() {
    const totalCantidad = articulosCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    cartCount.textContent = `(${totalCantidad})`;
}

function actualizarVistaCarrito() {
    if (articulosCarrito.length === 0) {
        mensajeVacio.style.display = 'block';
        carritoTotal.style.display = 'none';
        tablaCarrito.style.display = 'none';
        vaciarCarrito.style.display = 'none';
        pedirWhatsapp.style.display = 'none';
    } else {
        carritoTotal.style.display = 'block';
        mensajeVacio.style.display = 'none';
        tablaCarrito.style.display = 'table';
        vaciarCarrito.style.display = 'block';
        pedirWhatsapp.style.display = 'block';
    }
}

function actualizarTotal() {
    const total = articulosCarrito.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);
    totalPagar.textContent = total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function guardarCarritoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function cargarCarritoLocalStorage() {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
    actualizarVistaCarrito();
    actualizarContadorCarrito();
}
