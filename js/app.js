let cliente = {
    mesa: '',
    hora: '',
    pedido: []
}

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente(e) {
    e.preventDefault();
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    //Revisar si hay campos vacios
    const camposVacios = [mesa, hora].some(campo => campo === '');

    if (camposVacios) {

        // Verificar si ya hay una alerta
        const existeAlerta = document.querySelector('.invalid-feedback');

        if (!existeAlerta) {
            const alerta = document.createElement('DIV');
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
            alerta.textContent = 'Todos los campos son obligatorios';

            const modalBodyForm = document.querySelector('.modal-body form');
            modalBodyForm.appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return;
    }

    // Asignar datos del formulario a cliente
    cliente = { ...cliente, mesa, hora } // Toma una copia del array y lo reescribe con la mesa y la hora 

    // Ocultar Modal
    const modalFormulario = document.querySelector('#formulario');
    const modalBoostrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBoostrap.hide();

    // Mostrar las secciones
    mostrarSecciones();

    // Obtener platillos de la API
    obtenerPlatillos();
}

function mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
}

function obtenerPlatillos() {
    const url = "http://localhost:4000/platillos"

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(platillos => mostrarPlatillos(platillos))
        .catch(error => console.log(error))
}

function mostrarPlatillos(platillos) {
    const contenido = document.querySelector('#platillos .contenido');

    platillos.forEach(platillo => {
        const row = document.createElement('DIV');
        row.classList.add('row', 'py-3', 'border-top');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('DIV');
        precio.classList.add('col-md-3', 'fw-bold');
        precio.textContent = `$${platillo.precio}`;

        const categoria = document.createElement('DIV');
        categoria.classList.add('col-md-3');
        categoria.textContent = categorias[platillo.categoria];

        const inputCantidad = document.createElement('INPUT');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `Producto - ${platillo.id}`;
        inputCantidad.classList.add('form-control');

        // Funcion que detecta la cantidad y el platillo que se esta agregando
        inputCantidad.onchange = function () {
            const cantidad = parseInt(inputCantidad.value)
            agregarPlatillo({ ...platillo, cantidad })
        }

        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);

        contenido.appendChild(row);
    })
}

function agregarPlatillo(producto) {
    // Extraer el pedido actual
    let { pedido } = cliente;
    // Revisar que la cantidad sea mayor a 0
    if (producto.cantidad > 0) {
        //Comprueba si el elemento ya existe en el array
        if (pedido.some(articulo => articulo.id === producto.id)) {
            // El articulo ya existe
            const pedidoActualizado = pedido.map(articulo => {
                if (articulo.id === producto.id) {
                    articulo.cantidad = producto.cantidad
                }
                return articulo;
            });
            //Se asigna el nuevo array a cliente.pedido
            cliente.pedido = [...pedidoActualizado];
        } else {
            // El articulo no existe, lo agregamos al array de pedido
            cliente.pedido = [...pedido, producto];
        }
    } else {
        // Eliminar elementos cuando la cantidad es 0
        const resultado = pedido.filter( articulo => articulo.id !== producto.id)

        cliente.pedido = [...resultado]
    }

    //Limpiar el código html previo
    limpiarHTML()

    // Si hay algo en el array de pedido
    if(cliente.pedido.length){
        // Mostrar el Resumen
        actualizarResumen();
    } else {
        // Muestra el mensaje de que el pedido esta vacio
        mensajePedidoVacio();
    }
    

}

function actualizarResumen(){
    const contenido = document.querySelector('#resumen .contenido');

    const resumen = document.createElement('DIV');
    resumen.classList.add('col-md-6', 'card', 'py-5', 'px-3', 'shadow');

    //Información de la mesa
    const mesa = document.createElement('P');
    mesa.textContent = 'Mesa: ';
    mesa.classList.add('fw-bold')

    const mesaSpan = document.createElement('SPAN');
    mesaSpan.textContent = cliente.mesa;
    mesaSpan.classList.add('fw-normal');

    // Información de la hora
    const hora = document.createElement('P');
    hora.textContent = 'Hora: ';
    hora.classList.add('fw-bold')

    const horaSpan = document.createElement('SPAN');
    horaSpan.textContent = cliente.hora;
    horaSpan.classList.add('fw-normal');

    // Agregar a los parentElement
    mesa.appendChild(mesaSpan);
    hora.appendChild(horaSpan);

    //Titulo de la seccion
    const heading = document.createElement('H3');
    heading.textContent = 'Platillos Consumidos';
    heading.classList.add('my-4', 'text-center');

    // Iterar sobre el array de pedidos
    const grupo = document.createElement('UL');
    grupo.classList.add('list-group');

    const { pedido } = cliente
    pedido.forEach(articulo => {
        const { nombre, cantidad, precio, id } = articulo;

        const lista = document.createElement('LI');
        lista.classList.add('list-group-item');

        const nombreEl = document.createElement('H4');
        nombreEl.classList.add('my-4');
        nombreEl.textContent = nombre;

        const cantidadEl = document.createElement('P');
        cantidadEl.classList.add('fw-bold');
        cantidadEl.textContent = 'Cantidad: ';

        const cantidadValor = document.createElement('SPAN');
        cantidadValor.classList.add('fw-normal');
        cantidadValor.textContent = cantidad;

        const precioEl = document.createElement('P');
        precioEl.classList.add('fw-bold');
        precioEl.textContent = 'precio: ';

        const precioValor = document.createElement('SPAN');
        precioValor.classList.add('fw-normal');
        precioValor.textContent = `$${precio}`;

        const subtotalEl = document.createElement('P');
        subtotalEl.classList.add('fw-bold');
        subtotalEl.textContent = 'Subtotal: ';

        const subtotalValor = document.createElement('SPAN');
        subtotalValor.classList.add('fw-normal');
        subtotalValor.textContent = calcularSubtotal(precio, cantidad);
        
        // Boton para eliminar
        const btnEliminar = document.createElement('BUTTON');
        btnEliminar.classList.add('btn', 'btn-danger');
        btnEliminar.textContent = 'Eliminar del Pedido';

        // Función para eliminar del pedido
        btnEliminar.onclick = function(){
            eliminarProducto(id)
        }

        // Agregar valores a sus contenedores
        cantidadEl.appendChild(cantidadValor);
        precioEl.appendChild(precioValor);
        subtotalEl.appendChild(subtotalValor);

        // Agregar elementos al li
        lista.appendChild(nombreEl);
        lista.appendChild(cantidadEl);
        lista.appendChild(precioEl);
        lista.appendChild(subtotalEl);
        lista.appendChild(btnEliminar)

        // Agregar lista al grupo principal (ul)
        grupo.appendChild(lista);
    })

    resumen.appendChild(mesa);
    resumen.appendChild(hora);
    resumen.appendChild(heading);
    resumen.appendChild(grupo);

    // Agregar al contenido
    contenido.appendChild(resumen);
}

function limpiarHTML(){
    const contenido = document.querySelector('#resumen .contenido');

    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild);
    }
}

function calcularSubtotal(precio, cantidad){
    return `$ ${precio * cantidad}`;
}

function eliminarProducto(id){

    const { pedido } = cliente;

    const resultado = pedido.filter( articulo => articulo.id !== id);
    cliente.pedido = [...resultado];

    limpiarHTML();

    // Si hay algo en el array de pedido
    if(cliente.pedido.length){
        // Mostrar el Resumen
        actualizarResumen();
    } else {
        // Muestra el mensaje de que el pedido esta vacio
        mensajePedidoVacio();
    }
    
    // El producto se elimino por lo tanto reiniciamos la cantidad de producto a 0 en el input
    const productoEliminado = `#producto-${id}`;
    const inputEliminado = document.querySelector(productoEliminado);
    console.log(inputEliminado.value)
}

function mensajePedidoVacio(){

    const contenido = document.querySelector('#resumen .contenido');
    const texto = document.createElement('P');
    texto.classList.add('text-center');
    texto.textContent = 'Añade los elementos del pedido';

    contenido.appendChild(texto);
}