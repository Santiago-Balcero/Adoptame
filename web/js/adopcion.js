const url = "http://localhost:8080/adoptame/mascotas"

function mostrarMascotas(mascotas) {
    const section = document.getElementById('cards-grid')
    let cards = ""
    for(let i = 0; i < mascotas.length; i++) {
        const mascota = mascotas[i]
        if(mascota.nombre == null) {
            mascota.nombre = "Nombre no registrado"
        }
        cards += `
        <div class="col">
            <div class="card">
                <img src="${mascota.foto}" class="card-img-top">
                <div class="card-body">
                    <h5>${mascota.nombre}</h5>
                    <p class="card-text">Edad: ${mascota.edad} meses</p>
                    <button class="btn btn-primary" onclick="mostrarInformacion(${mascota.idmascota})">Información</button>
                </div>
            </div>
        </div>       
        `
    }
    section.innerHTML = cards
}

function mostrarInformacion(idmascota){
    const username = getDataUrl()
    window.location.href = "info-adopcion.html?idmascota=" + idmascota + "&username=" + username
}

async function getMascotas(url){
    const resp = await fetch(url)
    const mascotas = resp.json()
    return mascotas
}

function getDataUrl() {
    const search = window.location.search
    const urlHTML = new URLSearchParams(search)
    const username = urlHTML.get("username")
    return username
}

async function main(){
    if(sessionStorage.getItem("AuthenticationState") === null) {
        window.location.href = "principal.html"
    }
    else {
        const mascotas = await getMascotas(url)
        mostrarMascotas(mascotas)
        document.getElementById("inicio").href = "inicio.html?username=" + getDataUrl()
    }
}

main()