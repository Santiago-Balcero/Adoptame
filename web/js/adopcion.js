const url = "http://localhost:8080/adoptame/mascotas"

function mostrarMascotas(mascotas) {
    const section = document.getElementById('cards-grid')
    let cards = ""
    for(let i = 0; i < mascotas.length; i++) {
        const mascota = mascotas[i]
        cards += `
        <div class="col">
            <div class="card">
                <img src="${mascota.foto}" class="card-img-top" alt="...">
                <div class="card-body">
                    <a href="#" class="blog-card-title">${mascota.nombre}</a>
                    <p class="card-text">Raza: ${mascota.raza}</p>
                    <p class="card-text">Edad: ${mascota.edad} meses</p>
                    <p class="card-text">Ciudad: ${mascota.ciudad_mascota}</p>
                </div>
            </div>
        </div>       
        `
    }
    section.innerHTML = cards
}

async function getMascotas(url){
    const resp = await fetch(url)
    const mascotas = resp.json()
    return mascotas
}

async function main(){
    if(sessionStorage.getItem("AuthenticationState") === null) {
        window.location.href = "principal.html"
    }
    else {
        const mascotas = await getMascotas(url)
        mostrarMascotas(mascotas)
    }
}

main()