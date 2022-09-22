const url = "http://localhost:8080/adoptame/mascotas"

function mostrarMascota(mascota){
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
                <p class="card-text">Contacto: 3145553433</p>
                <div id="btn-section">
                <a class="btn btn-primary" onclick="registrarMascota()">Adoptar</a>
                </div>
            </div>
    </div>
    `
    section.innerHTML = card

}

async function getMascota(idmascota){
    const resp = await fetch(`${url}/${idmascota}`, {
        method: "GET"
    })
    const mascota = resp.json()
    return mascota
}

function getDataUrl () {
    const search = window.location.search
    const urlHTML = new URLSearchParams(search)
    const idmascota = urlHTML.get("idmascota")
    return idmascota
}

async function main() {
    const idmascota = getDataUrl()
    const mascota = await getMascota(idmascota)
    mostrarMascota(mascota)
}

main()

