
//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let aritculosCarrito = [];

cargarEventListeners()
function cargarEventListeners() {
    //Cuando agregas un libros  presionando 'Agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);


    //Elimina libros del carrito
    carrito.addEventListener('click', eliminarLibro);

    // Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        aritculosCarrito = []; //Reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML
    })
}


//Funciones

function agregarCurso(e) {
    e.preventDefault();


    if (e.target.classList.contains('agregar-carrito')) {
        const libroSelecionado = e.target.parentElement.parentElement;


        leerDatosLibro(libroSelecionado);
    }

}

// Elimina un libro del carrito 

function eliminarLibro(e) {
    console.log(e.target.classList)
    if (e.target.classList.contains('borrar-libro')) {
        const libroId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        aritculosCarrito = aritculosCarrito.filter(libro => libro.id !== libroId);

        carritoHMTL(); //iterar soibre el carrito y mostrarlo en html
    }
}


// Lee el contenido del HTML al que le dimos click y extrae la informacion del libro

function leerDatosLibro(libro) {
    console.log(libro)

    //Crear un objeto con el contenido del libro actual
    const infoLibro = {
        imagen: libro.querySelector('img').src,
        titulo: libro.querySelector('h4').textContent,
        precio: libro.querySelector('span').textContent,
        id: libro.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = aritculosCarrito.some(libro => libro.id === infoLibro.id);
    if (existe) {
        //Actualizamos la cantidad
        const libros = aritculosCarrito.map(libro => {
            if (libro.id === infoLibro.id) {
                libro.cantidad++
                return libro; //Retorna el objeto actualizado
            } else {
                return libro; // Retorna los objetos que no son los duplicados
            }
        })
        aritculosCarrito = [...libros]
    } else {
        //Agrega elementos al arreglo de carrito 
        aritculosCarrito = [...aritculosCarrito, infoLibro];
    }




    console.log(aritculosCarrito)

    carritoHMTL()
}


//Mustra el carrito de compras en el HTML

function carritoHMTL() {
    //limpiar el HTML
    limpiarHTML()

    //Recorre el carrito y genera el HTML
    aritculosCarrito.forEach((libro) => {
        const { imagen, titulo, precio, cantidad, id } = libro
        const row = document.createElement('tr');
        row.innerHTML = `
            <td >
                <img src='${imagen}' width= '100'>
            </td>

            <td>
                ${titulo}
            </td>

            <td>
                ${precio}
            </td>

            <td>
                ${cantidad}
            </td>

            <td>
                <a href='#' class='borrar-libro' data-id='${id}'>X</a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody

function limpiarHTML() {

    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}