

let precioTotalDeCarrito = 0;

const mostrarCarrito = (idProducto, precioProducto, stockProducto, tipoCuenta) => {

    /* OBTENGO EL PRECIO TOTAL A GASTAR EN EL CARRITO*/
    let contenedorPrecioTotalCarrito = document.getElementById('PrecioTotalEnCarrito')
    let precioTotalCarrito  = parseInt(contenedorPrecioTotalCarrito.textContent)
    /*OBTENGO LAS UNIDADES DEL PRODUCTO A COMPRAR */
    let contenedorUnidadesProducto = document.getElementById(idProducto)
    let unidadesProducto = parseInt(contenedorUnidadesProducto.textContent)

    if ((tipoCuenta === 'disminuir') && (unidadesProducto > 0) && precioTotalCarrito > 0){
        precioTotalDeCarrito -= parseInt(precioProducto)
    } 
    
    else if((tipoCuenta === 'aumentar') && (unidadesProducto < stockProducto)){
        precioTotalDeCarrito += parseInt(precioProducto)
    }

    let parrafoPrecioTotal = document.getElementById('parrafoPrecioTotal')    
    parrafoPrecioTotal.innerHTML=`PRECIO: $
        <span id="PrecioTotalEnCarrito">${precioTotalDeCarrito}</span>
    `
    precioTotalCarrito.textContent = precioTotalDeCarrito
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

const printCardsCarrito2 = (productos, container) => {
    const ultimasUnidades = "<span class='text-dark fw-bold' >Ultimas Unidades!</span>"

    productos.forEach(producto => {
        
    let card = document.createElement('div')
    card.className = "card mb-3"
    card.style.maxWidth = "540px"
    card.style.height = "15vh"
    card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${producto.imagen}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Stock: ${producto.stock} - Precio ${producto.precio}</p>
                <div class="d-flex justify-content-center">
                    <div role="group" class="btn-group d-flex justify-content-evenly align-items-center w-50">
                        <button onClick= mostrarCarrito("${producto._id}","${producto.precio}","${producto.stock}",'disminuir');disminuirCantidad("${producto._id}") class="btn btn-outline-dark" > - </button>
                        <button id=${producto._id} class="btn btn-outline-dark text-center disabled" style="width: 30px;"> 0 </button>
                        <button onClick= mostrarCarrito("${producto._id}","${producto.precio}","${producto.stock}",'aumentar');aumentarCantidad("${producto._id}","${producto.stock}"); class="btn btn-outline-dark"> + </button>
                    </div>
                </div>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            </div>
        </div>
    `
    container.appendChild(card)
})
}


const mostrarDataCarrito = () =>{
    let productosDeCarrito = JSON.parse(localStorage.getItem('productosDeCarrito'));
    let containerCarrito = document.getElementById('misProductos')
    // printCardsCarrito(productosDeCarrito, containerCarrito);
    printCardsCarrito2(productosDeCarrito, containerCarrito);
}

mostrarDataCarrito();















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

    // if (precioTotalCarrito === 0){
    //     /* SI NO HAY PRODUCTOS, VAMOS A SUMAR SOLAMENTE*/
    //     console.log('hay que aumentar solamente')

    //     precioTotalCarrito += parseInt(unidadesProducto) * parseInt(precioProducto)
    //     console.log(precioTotalCarrito)

    // }else{
        
    //     /* SI HAY PRODUCTOS, VAMOS A SUMAR O RESTAR AL PRECIO TOTAL*/
    //     contenedorPrecioTotal  = parseInt(precioTotalCarrito)
    //     let unidadesText = document.getElementById(idProducto);
    //     let unidades = parseInt(unidadesText.textContent);  

    //     if(tipoCuenta === "aumentar"){
    //         console.log('hay que aumentar')
    //         precioTotalCarrito += parseInt(unidadesProducto) * parseInt(precioProducto)
    //         console.log(precioTotalCarrito)
    //     }
    //     else if(tipoCuenta === "disminuir"){
    //         console.log('hay que restar')
    //         precioTotalCarrito = precioTotalCarrito - parseInt(unidadesProducto) * parseInt(precioProducto)
    //         console.log(precioTotalCarrito)
    //     }
    // }