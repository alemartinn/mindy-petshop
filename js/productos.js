
const filtrarProductos = (productos, container) => {
    let valorSelect = document.getElementById("selectInput")
    valorSelect.addEventListener("change", () => {

        if (valorSelect.value === "1") {

            productos.sort((a, b) => a.precio - b.precio)
            printCards(productos, container)

        } else if (valorSelect.value === "2") {

            productos.sort((a, b) => b.precio - a.precio);
            printCards(productos, container)

        } else if (valorSelect.value === "3") {

            productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            printCards(productos, container)

        } else if (valorSelect.value === "4") {

            productos.sort((b, a) => a.nombre.localeCompare(b.nombre));
            printCards(productos, container)

        } else if (valorSelect.value === "5") {

            productos.sort((a, b) => a.stock - b.stock);
            printCards(productos, container)

        } else if (valorSelect.value === "6") {

            productos.sort((a, b) => b.stock - a.stock);
            printCards(productos, container)

        }
    })
}

const generadorFiltroSelect = () => {
    let contenedorFiltros = document.getElementById("contenedorFiltros")
    contenedorFiltros.innerHTML = `
    <div class="d-flex justify-content-end container formSelect">
        <label for="lang " class="form-text col-md-1 col-12">Ordenar de: </label>
        <form action="#" class=" col-md-4 col-12 ">
        <select name="Precios" class="form-control form-control-sm "  id="selectInput" >
            <option value="0"> - </option>
            <option value="1">Precio: Menor a Mayor</option>
            <option value="2">Precio Mayor a Menor</option>
            <option value="3">Nombre: A - Z</option>
            <option value="4">Nombre: Z - A</option>
            <option value="5">Stock: Menor a Mayor</option>
            <option value="6">Stock: Mayor a Menor</option>
        </select>
        </form>
    </div>
    `
}
let productosDeCarritoArr = [];
let nuevoCarrito = [];

const mostrarProductoAgregado = (tipoProducto) => {

    let carrito = JSON.parse(localStorage.getItem('productosDeCarrito'))
    let nuevoCarrito = undefined;
    if(tipoProducto === "Juguete"){
        nuevoCarrito = carrito.filter(producto => producto.tipo === tipoProducto)
        nuevoCarrito.forEach(producto => {
            const contenedor = document.getElementById(producto._id+"i")
            contenedor.style.display = "inline-block"
        })
    }
    else if(tipoProducto === "Medicamento"){
        nuevoCarrito = carrito.filter(producto => producto.tipo === tipoProducto)
        nuevoCarrito.forEach(producto => {
            const contenedor = document.getElementById(producto._id+"i")
            contenedor.style.display = "inline-block"
        })
    }
}

/* RECIBO TODAS LAS PROPIEDADES DE PRODUCTOS PARA GUARDAR MI PRODUCTO EN LOCAL STORAGE */
const agregarAlCarrito = (productoId, productoNombre, productoDescripcion, productoImagen, productoPrecio, productoStock, productoTipo, productoV) => {

    /* ESTO AGREGA EL ICONO DE CARRITO AL PRODUCTO QUE SE ENCUENTRE EN EL CARRITO */
    const contenedor = document.getElementById(productoId+"i")
    contenedor.style.display = "inline-block"

    let producto = {
        _id: productoId,
        nombre: productoNombre,
        descripcion: productoDescripcion,
        imagen: productoImagen,
        precio: productoPrecio,
        stock: productoStock,
        tipo: productoTipo,
        __v: productoV,
        unidades: 1
    };
    
    /* SI NO HAY NADA EN EL LOCAL STORAGE ENTONCES LO CREAMOS */
    if (!window.localStorage.getItem('productosDeCarrito')) {
        productosDeCarritoArr = [producto]

    } else {
        /* SI HAY ALGO ENTONCES VERIFICAMOS QUE NO SE REPITA*/

        /* RECUPERA LO QUE TENGAMOS EN EL LOCAL STORAGE */
        productosDeCarritoArr = JSON.parse(localStorage.getItem('productosDeCarrito'))

        /* BUSCA SI EL PRODUCTO QUE FUE CLICKEADO SE ENCUENTRA EN EL ARRAY RECUPERADO DE LOCAL STORAGE */
        let indiceProducto = productosDeCarritoArr.find((productoCar => productoId === productoCar._id))

        /* SI NO ENCONTRO EL ELEMENTO ENTONCES LO AGREGA AL ARRAY */
        if (!indiceProducto) {
            nuevoCarrito = JSON.parse(localStorage.getItem('productosDeCarrito'))
            productosDeCarritoArr = [...nuevoCarrito, producto]
        }
        /* CASO CONTRARIO NO AGREGO NADA PORQUE SE REPETIRIA */
    }


    /* LOCAL STORAGE ESPERA UNA CADENA, USO STRINGIFY */
    let productosDeCarrito = JSON.stringify(productosDeCarritoArr);
    window.localStorage.setItem('productosDeCarrito', productosDeCarrito);
}

const getFilteredProducts = (datosProductos, tipoProducto) => {
    return datosProductos.filter(producto => producto.tipo == tipoProducto)
}

const printCards = (productos, container) => {

    const ultimasUnidades = "<span class='text-dark fw-bold' >Ultimas Unidades!</span>"
    container.innerHTML = "";

    productos.forEach(producto => {
        let card = document.createElement('div')
        card.className = 'card shadow'
        card.style.width = '18rem'
        card.style.minWidth = '300px'
        card.innerHTML = `
        <img src="${producto.imagen}" style="height: 30vh; border-bottom: 1px solid rgba(0,0,0,0.08);" class="card-img-top" alt="producto">
        <div class="card-body" style="height: 10vh;">
            <h5 class="card-title">${producto.nombre}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between">Precio: $${producto.precio} <span id="${producto._id}i" style="display: none;"><img style="height: 22px;" src="./assets/img/carrito.png"></span></li>
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
    const container = document.getElementById('productsContainer')

    if (tituloPagina.textContent == 'JUGUETES') {

        generadorFiltroSelect()
        let productos = getFilteredProducts(dataApi, "Juguete")
        printCards(productos, container);
        mostrarProductoAgregado("Juguete");
        filtrarProductos(productos, container);

    } else if (tituloPagina.textContent == 'REMEDIOS') {
        generadorFiltroSelect()
        let productos = getFilteredProducts(dataApi, "Medicamento")

        printCards(productos, container);
        mostrarProductoAgregado("Medicamento");
        filtrarProductos(productos, container);
    }
}

/* Funcion que obtiene los datos de la API mindy-petshop */
const getData = async () => {
    try {
        let respuesta = await fetch("https://apipetshop.herokuapp.com/api/articulos");
        let respuestaJson = await respuesta.json();
        let dataApi = respuestaJson.response;
        // console.log(dataApi)
        showData(dataApi);
    }
    catch (error) {
        console.log(error)
    }
}

getData();