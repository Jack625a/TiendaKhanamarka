const botonesAgregar = document.querySelectorAll('.agregar-carrito');
const listacarrito = document.getElementById('lista-carrito');
const contadorAgregados = document.getElementById('contador');
const totalHTMl = document.getElementById('total');


let contador = 0;
const carrito = [];

botonesAgregar.forEach((boton, index) => {
    boton.addEventListener('click', () => {
        contador++;
        const cantidadInput = boton.previousElementSibling;
        const cantidad = parseInt(cantidadInput.value);
        if (!isNaN(cantidad) && cantidad > 0) {
            const nombre = boton.dataset.nombre;
            const precio = boton.dataset.precio;
            const producto = {
                nombre: nombre,
                precio: precio,
                cantidad: cantidad
            };
            carrito.push(producto);

            contador += cantidad;
            contadorAgregados.textContent = contador;
        }
        mostrarcarrito();
    });
});

function mostrarcarrito() {
    listacarrito.innerHTML = '';
    let totalPagar = 0;

    carrito.forEach((producto, index) => {
        const elementoLista = document.createElement('li');
        elementoLista.innerHTML = `${producto.nombre} - Precio: ${producto.precio} Bs <button class="eliminar-producto" data-index="${index}">Eliminar</button> <br>`;
        listacarrito.appendChild(elementoLista);
        totalPagar += producto.cantidad * producto.precio;
    });
    totalHTMl.textContent = totalPagar.toFixed(2);

    const botonEliminar = document.querySelectorAll('.eliminar-producto');

    botonEliminar.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            carrito.splice(index, 1);
            contador--;
            contadorAgregados.textContent = contador;
            mostrarcarrito();
        });
    });
}

const botonConfirmarVenta = document.getElementById('confirmar-venta');
const formularioEmergente = document.getElementById('formulario-emergente');
const formularioCompra = document.getElementById('formulario-compra');

botonConfirmarVenta.addEventListener('click', () => {
    formularioEmergente.style.display = 'block';
});

formularioCompra.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombreCliente = document.getElementById('nombre').value;
    const emailCliente = document.getElementById('email').value;

    const listaCarrito = document.getElementById('lista-carrito').innerHTML;

    const precioTotal = document.getElementById('total').textContent;

    const resumenCompra = `
        <h3>Resumen de Compra</h3>
        <p>Nombre del Cliente: ${nombreCliente}</p>
        <p>Correo Electrónico: ${emailCliente}</p>
        <p>Productos Comprados:</p>
        <ul>
            ${listaCarrito}
        </ul>
        <p>Precio Total: Bs ${precioTotal}</p>
        <p>¡Gracias por su compra!</p>
        <button id="boton-imprimir">Imprimir Detalla</button>
        <script>
            const botonImprimir=document.getElementById('boton-imprimir');
            botonImprimir.addEventListener('click',()=>{
                window.print();
            });
        </script>
    `;

    const nuevaVentana = window.open('', '_blank', 'width=400,height=400');
    nuevaVentana.document.open();
    nuevaVentana.document.write(resumenCompra);
    nuevaVentana.document.close();

    formularioEmergente.style.display = 'none';
});

/*let slideIndex=0;
const slides=document.querySelectorAll('.slide');
function showSlide(n){
    if(n<0){
        slideIndex=slides.length-1;
    }
    if(n>=slides.length){
        slideIndex=0;
    }
    slides.forEach(slide) => {
        slides.style.display='none';
    };
    slides[slideIndex].style.display='block';
    slideIndex++;
    setTimeout(showSlide,3000)
};
showSlide(0)*/

