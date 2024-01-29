const carrito = document.querySelector('#carrito');

const listaCarrito = document.querySelector('#lista-carrito tbody');

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];



//Listeners
cargarEventListeners()
function cargarEventListeners(){
    //Agrega cursos al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();

    } )
}


//Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHtml();
    }
}


//Lee al contenido del HTML al que le dimos click y extrae la información del curso

function leerDatosCurso(cursos){
    // console.log(cursos);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: cursos.querySelector('img').src,
        titulo: cursos.querySelector('h4').textContent,
        precio: cursos.querySelector('.precio span').textContent,
        id: cursos.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }   

    const existe = articulosCarrito.some(cursos => cursos.id === infoCurso.id);

    if(existe){
        const cursos = articulosCarrito.map( cursos => {
            if(cursos.id === infoCurso.id){
                cursos.cantidad++;
                return cursos;
            } else{
                return cursos;
            }
            
        });
        articulosCarrito = [...cursos]
        
    } else{
        //Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHtml();
};


//Muestra el carrito de compras en el html
function carritoHtml(){

    //limpia el carrito
    limpiarHTML();


    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso =>{
        console.log(curso);
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML= `

            <td>
               <img src="${imagen}"></img>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>    
            </td>
        `;
        //Agrega el HTML del carrito en el tbody
        listaCarrito.appendChild(row);

    });
}


function limpiarHTML(){
    //forma lenta
    // listaCarrito.innerHTML = '';

    //forma rapida
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}