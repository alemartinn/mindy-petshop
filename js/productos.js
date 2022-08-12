
// const printCardsCarrito = (productos, container) => {

//     const ultimasUnidades = "<span class='text-dark fw-bold' >Ultimas Unidades!</span>"

//     productos.forEach(producto => {
//         let card = document.createElement('div')
//         card.className = 'card shadow'
//         card.style.width = '18rem'
//         card.style.minWidth = '300px'
//         card.innerHTML = `
//         <img src="${producto.imagen}" style="height: 50%; border-bottom: 1px solid rgba(0,0,0,0.08);" class="card-img-top" alt="producto">
//         <div class="card-body" style="height: 50%;">
//             <h5 class="card-title">${producto.nombre}</h5>
//         </div>
//         <ul class="list-group list-group-flush">
//             <li class="list-group-item">Precio: $${producto.precio}</li>
//             <li class="list-group-item d-flex justify-content-between">Stock: ${producto.stock} ${producto.stock < 3 ? ultimasUnidades : ""}</li>
//         </ul>
//         <div class="card-body d-flex justify-content-around">
//             <div class="d-flex justify-content-evenly align-items-center">
//                 <button onClick=disminuirCantidad("${producto._id}") class="boton botonRestar" > - </button>
//                 <span id=${producto._id} class="text-center" style="width: 30px;"> 0 </span>
//                 <button onClick=aumentarCantidad("${producto._id}","${producto.stock}")> + </button>
//             </div>
//             <a href="./carrito.html" class="btn btn-outline-dark card-link">Comprar</a>
//         </div>
//         `
//         container.appendChild(card)
//     })
// }

let productosDeCarritoArr=[];
let nuevoCarrito = [];

/* RECIBO TODAS LAS PROPIEDADES DE PRODUCTOS PARA GUARDAR MI PRODUCTO EN LOCAL STORAGE */
const agregarAlCarrito = async (productoId, productoNombre, productoDescripcion, productoImagen, productoPrecio, productoStock, productoTipo, productoV) => {
    
    let producto = {
        _id: productoId,
        nombre: productoNombre,
        descripcion: productoDescripcion,
        imagen: productoImagen,
        precio: productoPrecio,
        stock: productoStock,
        tipo: productoTipo,
        __v: productoV
    };



    /* SI NO HAY NADA EN EL LOCAL STORAGE ENTONCES LO CREAMOS */
    if(!window.localStorage.getItem('productosDeCarrito')){
        console.log('no habia nada en el local storage')
        productosDeCarritoArr = [producto]
        console.log(productosDeCarritoArr)

    }else{
        /* SI HAY ALGO ENTONCES VERIFICAMOS QUE NO SE REPITA*/


        console.log('habia algo en el local storage')
        console.log(productosDeCarritoArr)
        // productosDeCarritoArr.forEach(prod => console.log(typeof(prod._id)))

        let indiceProducto = productosDeCarritoArr.find((productoCar => productoId === productoCar._id))

        console.log(indiceProducto)

        if (!indiceProducto){
            console.log('pero no estaba el producto que agregaste')
            nuevoCarrito = JSON.parse(localStorage.getItem('productosDeCarrito'))
            productosDeCarritoArr = [...nuevoCarrito, producto]
            console.log(productosDeCarritoArr)
        }
        else{
            console.log('pero ese producto ya estaba en el storage')
        }

    }
    

    /* LOCAL STORAGE ESPERA UNA CADENA, USO STRINGIFY */
    let productosDeCarrito = JSON.stringify(productosDeCarritoArr);
    window.localStorage.setItem('productosDeCarrito',productosDeCarrito);
}

const aumentarCantidad = (idProducto, stockTotal) => {
    let valorElegidoText = document.getElementById(idProducto);
    let valorElegido = parseInt(valorElegidoText.textContent);
    if (valorElegido < stockTotal){
        valorElegido++;
    }
    valorElegidoText.textContent = valorElegido;
}

const disminuirCantidad = (idProducto) => {
    let valorElegidoText = document.getElementById(idProducto);
    let valorElegido = parseInt(valorElegidoText.textContent);
    if (valorElegido > 0){
        valorElegido--;
    }
    valorElegidoText.textContent = valorElegido;
}

const getFilteredProducts = (datosProductos, tipoProducto) => {
    return datosProductos.filter(producto => producto.tipo == tipoProducto)
}

const printCards = (productos, container) => {

    const ultimasUnidades = "<span class='text-dark fw-bold' >Ultimas Unidades!</span>"

    productos.forEach(producto => {
        let card = document.createElement('div')
        card.className = 'card shadow'
        card.style.width = '18rem'
        card.style.minWidth = '300px'
        card.innerHTML = `
        <img src="${producto.imagen}" style="height: 50%; border-bottom: 1px solid rgba(0,0,0,0.08);" class="card-img-top" alt="producto">
        <div class="card-body" style="height: 50%;">
            <h5 class="card-title">${producto.nombre}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Precio: $${producto.precio}</li>
            <li class="list-group-item d-flex justify-content-between">Stock: ${producto.stock} ${producto.stock < 3 ? ultimasUnidades : ""}</li>
        </ul>
        <div class="card-body d-flex justify-content-around">
            <button onclick="agregarAlCarrito('${producto._id}','${producto.nombre}','${producto.descripcion}','${producto.imagen}','${producto.precio}','${producto.stock}','${producto.tipo}','${producto.__v}')" class="btn btn-outline-dark card-link"> Agregar a carrito </button>
            <a href="./carrito.html" class="btn btn-outline-dark card-link"> Comprar </a>
        </div>
        `
        container.appendChild(card)
    })
}

const showData = (dataApi) => {

    let tituloPagina = document.querySelector('h1')
    // const container = document.getElementById('productsContainer')

    if (tituloPagina.textContent == '¡QUE LA DIVERSION NO PARE!'){

        const container = document.getElementById('productsContainer')
        let productos = getFilteredProducts(dataApi, "Juguete")
        printCards(productos, container);
        /* FILTRAR POR CATEGORIAS */

    } else if (tituloPagina.textContent == 'SU SALUD TU PRIORIDAD, Y LA NUESTRA'){
        const container = document.getElementById('productsContainer')
        let productos = getFilteredProducts(dataApi, "Medicamento")

        printCards(productos, container);
        /* FILTRAR POR CATEGORIAS */
    }
}

/* Funcion que obtiene los datos de la API mindy-petshop */
const getData = async () => {
    try{
        let respuesta = await fetch("https://apipetshop.herokuapp.com/api/articulos");
        let respuestaJson = await respuesta.json();
        let dataApi = respuestaJson.response;
        console.log(dataApi)
        showData(dataApi);
    }
    catch(error){
        console.log(error)
    }
}

getData();