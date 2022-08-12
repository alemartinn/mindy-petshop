document.getElementById('botonAlerta').addEventListener('click',(e) => {
    e.preventDefault()
    let contenedorAlerta = document.getElementById('contenedorAlerta')
    contenedorAlerta.innerHTML=`
    <div class="alert alert-success m-2" style="min-height: 7vh;" role="alert" id="miAlertaContact">
        <b>¡Su mensaje ha sido enviado correctamente, gracias por contactarnos!</b>
    </div>
    `
    setTimeout(() => {
    let borrarAlerta = document.getElementById('contenedorAlerta')
    contenedorAlerta.innerHTML=`
    <div class="alert alert-success m-2" style="min-height: 7vh; display: none;" role="alert" id="miAlertaContact">
        Su mensaje ha sido enviado correctamente, gracias por contactarnos!
    </div>
    `
    },3000)
})
