
const getFilteredProducts = (datosProductos, tipoProducto) => {
    return datosProductos.filter(producto => producto.tipo == tipoProducto)
}

/* <div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="producto">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
    </ul>
    <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
    </div>
</div> */

const printCards = (productos, container) => {

    const ultimasUnidades = "<span class='text-dark fw-bold' >Ultimas Unidades!</span>"

    productos.forEach(producto => {

        if (parseInt(producto.stock) < 3){
            
        }
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
            <div class="d-flex justify-content-evenly align-items-center">
                <button onClick=disminuirCantidad()>-</button>
                <span class="text-center" style="width: 30px;"> 1 </span>
                <button onClick=aumentarCantidad()>+</button>
            </div>
            <a href="#" class="btn btn-outline-dark card-link">Comprar</a>
        </div>
        `    
        container.appendChild(card)
    })
}

const showData = (dataApi) => {

    let tituloPagina = document.querySelector('h1')
    // const container = document.getElementById('productsContainer')

    if (tituloPagina.textContent == 'JUGUETES'){

        const container = document.getElementById('productsContainer')
        let productos = getFilteredProducts(dataApi, "Juguete")
        printCards(productos, container);
        /* FILTRAR POR CATEGORIAS */

    } else if (tituloPagina.textContent == 'REMEDIOS'){
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