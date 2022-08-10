
const getData = () => {
    let response = fetch("https://apipetshop.herokuapp.com/api/articulos")
    console.log(response)
}

getData;