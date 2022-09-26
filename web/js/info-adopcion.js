const url = "http://localhost:8080/adoptame/mascotas"
const url2 = "http://localhost:8080/adoptame/adopcion"
const url3 = "http://localhost:8080/adoptame/usuarios"

let ADOPCION = false

async function mostrarMascota(mascota){
    if(mascota.adopcion == 0) {
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
                    <p class="card-text">Sexo: ${mascota.sexo}</p>
                    <p class="card-text">Ciudad: ${mascota.ciudad}</p>
                    <p class="card-text">Estado de salud: ${mascota.salud}</p>
                    <p class="card-text">Contacto: ${user.nombres} ${user.apellidos}</p>
                    <p class="card-text">Teléfono: ${user.telefono}</p>
                    <p class="card-text">Email: ${user.email}</p>
                    <div id="alert-cont">
                    </div>
                    <div id="btn-section">
                    <a class="btn btn-primary" onclick="crearAdopcion()" id="btn-adoptar">Adoptar</a>
                    </div>
                </div>
        </div>
        `
        section.innerHTML = card
    }
    else {
        const adopcion = await getAdopcionIdMascota(mascota.idmascota)
        const usuarioAdoptante = await getUser(adopcion.username_adoptante)
        const section = document.getElementById('mascota-cont')
        let card = `
        <div class="card">
                <div class="card-body">
                <h5>Solicitud de adopción</h5>   
                <img src="${usuarioAdoptante.foto}" class="card-img-top img-perfil" alt="...">
                    <hr>
                    <p class="card-text">Solicitud #: ${adopcion.idadopcion}</p>
                    <p class="card-text">Nombre de quien solicita: ${usuarioAdoptante.nombres} ${usuarioAdoptante.apellidos}</p>
                    <p class="card-text">Ciudad: ${usuarioAdoptante.ciudad}</p>
                    <p class="card-text">Teléfono: ${usuarioAdoptante.telefono}</p>
                    <p class="card-text">Email: ${usuarioAdoptante.email}</p>
                    <p class="card-text">Biografía: ${usuarioAdoptante.biografia}</p>
                    <p class="card-text">Esta persona quiere adoptar tu mascota y espera una respuesta de tu parte.</p>
                    <p class="card-text">Ponte en contacto con ella para continuar con el proceso.</p>
                </div>
        </div>
        `
        section.innerHTML = card
    }
}

async function crearAdopcion(){
    //Condicional para que al dar click sobre el botón actualizado el método no se ejecute
    //gracias a la bandera ADOPCION
    if(!ADOPCION) {
        const idmascota = getDataUrlIdmascota()
        var username = getDataUrlUsername()
        const adopcion = {
        username_adoptante: username,
        idmascota: idmascota
        }
        const texto = await registrarAdopcion(adopcion)
        ADOPCION = true
        const section = document.getElementById('alert-cont')
        section.innerHTML = `
        <div class="alert alert-success" role="alert">
            ${texto} <br>El encargado de tu nueva mascota se comunicará pronto contigo.
        </div>`
        document.getElementById("btn-adoptar").innerText = "Volver a inicio"
        document.getElementById("btn-adoptar").addEventListener("click", ()=>{
            window.location.href = "inicio.html?username=" + username
        }, false)
    }
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

async function getAdopcionIdMascota(idmascota) {
    const resp = await fetch(`${url2}/${idmascota}`, {
        method: "GET"
    })
    const adopcion = resp.json()
    return adopcion
}

async function main() {
    if (sessionStorage.getItem("AuthenticationState") === null) {
        window.location.href = "principal.html"
    }
    else {
        const username = getDataUrlUsername()
        const idmascota = getDataUrlIdmascota()
        const mascota = await getMascota(idmascota)
        mostrarMascota(mascota)
        document.getElementById("nosotros").href = "nosotros.html?username=" + username
        document.getElementById("inicio").href = "inicio.html?username=" + username
        document.getElementById("ayuda").href = "ayuda.html?username=" + username
    }
}

main()

