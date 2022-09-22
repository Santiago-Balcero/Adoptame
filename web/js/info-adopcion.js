const url = "http://localhost:8080/adoptame/mascotas"
const url2 = "http://localhost:8080/adoptame/adopcion"
const url3 = "http://localhost:8080/adoptame/usuarios"

async function mostrarMascota(mascota){
    const idcontacto = mascota.idcontacto
    const user = await getUser(idcontacto)
    const section = document.getElementById('mascota-cont')
    let card = `
    <div class="card">
            <img src="${mascota.foto}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5>${mascota.nombre}</h5>
                <hr>
                <p class="card-text">Edad: ${mascota.edad} meses</p>
                <p class="card-text">Raza: ${mascota.raza}</p>
                <p class="card-text">Ciudad: ${mascota.ciudad}</p>
                <p class="card-text">Estado de salud: ${mascota.salud}</p>
                <p class="card-text">Contacto: ${user.telefono}</p>
                <div id="alert-cont">
            
                </div>
                <div id="btn-section">
                <a class="btn btn-primary" onclick="crearAdopcion()">Adoptar</a>
                </div>
            </div>
    </div>
    `
    section.innerHTML = card

}

async function crearAdopcion(){
    const idmascota = getDataUrlIdmascota()
    const username = getDataUrlUsername()
    const adopcion = {
        username_adoptante: username,
        idmascota: idmascota
    }
    const texto = await registrarAdopcion(adopcion)
    const section = document.getElementById('alert-cont')
    section.innerHTML = `
    <div class="alert alert-success" role="alert">
        ${texto} <br>El encargado de tu nueva mascota se comunicará pronto contigo.
    </div>`
}

async function registrarAdopcion(adopcion){
    const resp = await fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adopcion)
    })
    const texto = resp.text()   
    return texto
}

async function getMascota(idmascota){
    const resp = await fetch(`${url}/${idmascota}`, {
        method: "GET"
    })
    const mascota = resp.json()
    return mascota
}

async function getUser(username){
    const resp = await fetch(`${url3}/${username}`, {
        method: "GET"
    })
    const user = resp.json()
    return user
}

function getDataUrlIdmascota() {
    const search = window.location.search
    const urlHTML = new URLSearchParams(search)
    const idmascota = urlHTML.get("idmascota")
    return idmascota
}

function getDataUrlUsername() {
    const search = window.location.search
    const urlHTML = new URLSearchParams(search)
    const username = urlHTML.get("username")
    return username
}

async function main() {
    const idmascota = getDataUrlIdmascota()
    const mascota = await getMascota(idmascota)
    mostrarMascota(mascota)
}

main()

