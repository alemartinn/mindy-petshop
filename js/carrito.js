let precioTotalDeCarrito = 0;

const mostrarCarrito = (
  idProducto,
  precioProducto,
  stockProducto,
  tipoCuenta
) => {
  /* OBTENGO EL PRECIO TOTAL A GASTAR EN EL CARRITO*/
  let contenedorPrecioTotalCarrito = document.getElementById(
    "PrecioTotalEnCarrito"
  );
  let precioTotalCarrito = parseInt(contenedorPrecioTotalCarrito.textContent);
  /*OBTENGO LAS UNIDADES DEL PRODUCTO A COMPRAR */
  let contenedorUnidadesProducto = document.getElementById(idProducto);
  let unidadesProducto = parseInt(contenedorUnidadesProducto.textContent);

  if (tipoCuenta === "disminuir" && unidadesProducto > 0 && precioTotalCarrito > 0) {
    precioTotalDeCarrito -= parseInt(precioProducto);
  } else if (tipoCuenta === "aumentar" && unidadesProducto < stockProducto) {
    precioTotalDeCarrito += parseInt(precioProducto);
  }

  let parrafoPrecioTotal = document.getElementById("parrafoPrecioTotal");
  parrafoPrecioTotal.innerHTML = `Total: $
        <span id="PrecioTotalEnCarrito">${precioTotalDeCarrito}</span>
    `;
  precioTotalCarrito.textContent = precioTotalDeCarrito;
};

const aumentarCantidad = (idProducto, stockTotal) => {
  let valorElegidoText = document.getElementById(idProducto);
  let valorElegido = parseInt(valorElegidoText.textContent);
  if (valorElegido < stockTotal) {
    valorElegido++;
  }
  valorElegidoText.textContent = valorElegido;
};

const disminuirCantidad = (idProducto) => {
  let valorElegidoText = document.getElementById(idProducto);
  let valorElegido = parseInt(valorElegidoText.textContent);
  if (valorElegido > 0) {
    valorElegido--;
  }
  valorElegidoText.textContent = valorElegido;
};

// Pintar las card del carrito 
const printCardsCarrito2 = (productos, container) => {
  const ultimasUnidades =
    "<span class='text-dark fw-bold' >Ultimas Unidades!</span>";
    container.innerHTML = "";
  if (productos.length === 0) {
    let aviso = document.createElement("div");
    aviso.innerHTML = `
        <div class="alert alert-dark text-center fs-5 m-4 m-sm-0" role="alert">
            No hay ningun producto en el carrito!
        </div>
        `;
    container.appendChild(aviso);
  } else {
    productos.forEach((producto) => {
      let card = document.createElement("div");
      card.className = "card mt-2 m-auto d-flex justify-content-center border-0 border-bottom  rounded-0";
      card.style.maxWidth = "500px";
      card.style.minheight = "15vh";
      card.innerHTML = `
                <div class="row g-0 ">
                    <div class="col-md-4 d-flex">
                    <img src="${producto.imagen}" class="img-fluid rounded-start m-auto" alt="..." style="width: 300px; height: 140px; object-fit: contain">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title text-center">${producto.nombre}</h5>
                        <p class="card-text text-center">Stock: ${producto.stock} - Precio: $${producto.precio}</p>
                        <div class="d-flex justify-content-center">
                            <div role="group" class="btn-group d-flex align-items-center w-50">
                                <button onClick= mostrarCarrito("${producto._id}","${producto.precio}","${producto.stock}",'disminuir');disminuirCantidad("${producto._id}") class="btn btn-outline-dark" > - </button>
                                <button id=${producto._id} class="btn btn-outline-dark text-center disabled" style="width: 30px;"> 0 </button>
                                <button onClick= mostrarCarrito("${producto._id}","${producto.precio}","${producto.stock}",'aumentar');aumentarCantidad("${producto._id}","${producto.stock}"); class="btn btn-outline-dark"> + </button>
                            </div>
                            <div class=" d-flex mx-4">
                                <button type="button" class="btn btn-outline-dark" onClick= quitarDelCarrito("${producto._id}","${producto.precio}") > X </button>
                            </div>
                        </div>
                        <p class="card-text text-center mt-1"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                    </div>
                </div>
            `;
      container.appendChild(card);
    });
  }
};

// Finalizar compra
const finalizarCompra = () =>{
    mostrarCompraRealizada();
    localStorage.clear("productosDeCarrito")
    let containerCarrito = document.getElementById("misProductos");
    containerCarrito.innerHTML = ""
}
// Mostrar ventana de la compra
const mostrarCompraRealizada = () =>{
    const contenedor = document.getElementById("misAlertas")
    contenedor.innerHTML = ""
    let productoDeCarritoLS = localStorage.getItem("productosDeCarrito")
    if(productoDeCarritoLS){
        let avisoFinalizarCompra = document.createElement("div");
        avisoFinalizarCompra.innerHTML = `
            <div class="alert alert-dark text-center fs-5 m-4 m-sm-3" role="alert">
                Tu compra fue realizada con exito!
            </div>
            `
        contenedor.appendChild(avisoFinalizarCompra);
    }else{
        let avisoFinalizarCompra = document.createElement("div");
        avisoFinalizarCompra.innerHTML = `
            <div class="alert alert-danger text-center fs-5 m-4 m-sm-3" role="alert">
                Agrega productos para realizar tu compra!
            </div>
            `
        contenedor.appendChild(avisoFinalizarCompra);
    }
    
}

// Vaciar carrito
const vaciarCarrito = () =>{
    localStorage.clear("productosDeCarrito")

    let containerCarrito = document.getElementById("misProductos");
    containerCarrito.innerHTML = `
        <div class="alert alert-dark text-center fs-5 m-4 m-sm-0" role="alert">
            No hay ningun producto en el carrito!
        </div>
        `
}


// Eliminar producto
const quitarDelCarrito = (idProducto,precioProducto) => {
    let productosDeCarritoArray = JSON.parse(localStorage.getItem("productosDeCarrito"));


    //   console.log(productosDeCarritoArray);
    let containerCarrito = document.getElementById("misProductos");
    // filtro los prductos
    let nuevosProductosCarrito = productosDeCarritoArray.filter( productos => productos._id !== idProducto);

    localStorage.setItem("productosDeCarrito",JSON.stringify(nuevosProductosCarrito));
    
    let unidadesProductosText = document.getElementById(idProducto)
    let unidadesProducto = parseInt(unidadesProductosText.textContent)

    const precioTotalEnCarritoText = document.getElementById("PrecioTotalEnCarrito")
    let precioTotalEnCarrito = parseInt(precioTotalEnCarritoText.textContent)

    let precioActualizado = precioTotalEnCarrito - (unidadesProducto * parseInt(precioProducto))
    
    let parrafoPrecioTotal = document.getElementById("parrafoPrecioTotal");
    parrafoPrecioTotal.innerHTML = `Total: $
        <span id="PrecioTotalEnCarrito">${precioActualizado}</span>
    `;
    precioTotalEnCarritoText.textContent = precioActualizado





    //Pinto los prductos filtrado
    printCardsCarrito2(nuevosProductosCarrito, containerCarrito);
};

const mostrarDataCarrito = () => {
  let productosDeCarrito = JSON.parse(localStorage.getItem("productosDeCarrito"));
  let containerCarrito = document.getElementById("misProductos");
  printCardsCarrito2(productosDeCarrito, containerCarrito);
};

mostrarDataCarrito();

