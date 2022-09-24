const url = "http://localhost:8080/adoptame/mascotas"

function mostrarCiudades(ciudades){
    const section = document.getElementById('ciudad-input')
    let options = "<option>Todas</option>"
    for(let i=0; i<ciudades.length; i++){
        const ciudadd = ciudades[i]
        options += `
        <option>${ciudadd.ciudad}</option>
        `
    }
    section.innerHTML = options
}

function mostrarRazas(razas){
    const section = document.getElementById('raza-input')
    let options = "<option>Todas</option>"
    for(let i=0; i<razas.length; i++){
        const razaa = razas[i]
        options += `
        <option>${razaa.raza}</option>
        `
    }
    section.innerHTML = options
}

function mostrarMascotas(mascotas) {
    const section = document.getElementById('cards-grid')
    let cards = ""
    let clase = ""
    for(let i = 0; i < mascotas.length; i++) {
        const mascota = mascotas[i]
        if(mascota.nombre == null) {
            mascota.nombre = "Nombre no registrado"
        }
        if(mascota.edad>=1 && mascota.edad<=6){
            clase = "1a6"
        }
        else if(mascota.edad>=7 && mascota.edad<=12){
            clase = "7a12"
        }
        else if(mascota.edad>=13 && mascota.edad<=24){
            clase = "13a24"
        }
        cards += `
        <div class="col mascota-adop ${mascota.ciudad} ${mascota.raza} ${mascota.especie} ${clase} ${mascota.tamanio} todos-valores">
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

function filtrar(e){
    e.preventDefault()
    const form = e.target
    const mascotasAdop = document.querySelectorAll(".mascota-adop")
    let filtros = [form.ciudad.value, form.raza.value, form.especie.value, form.edad.value, form.tamanio.value]
    let valores = []
    for (let i= 0; i < filtros.length; i++) {
        let valor = ""
        if (filtros[i]=="Todas" || filtros[i]=="Todos"){
            valor = "todos-valores"
        }
        else if(filtros[i]=="1 a 6 meses"){
            valor = "1a6"
        }
        else if(filtros[i]=="7 a 12 meses"){
            valor = "7a12"
        }
        else if(filtros[i]=="13 a 24 meses"){
            valor = "13a24"
        }
        else {
            valor = filtros[i]
        }
        valores.push(valor)
    }

    for (let i =0; i < mascotasAdop.length; i++){
        const mascota = mascotasAdop[i]
        if(mascota.classList.contains(valores[0]) && mascota.classList.contains(valores[1]) && mascota.classList.contains(valores[2]) && mascota.classList.contains(valores[3]) && mascota.classList.contains(valores[4])){
            mascota.style.display = "flex"
        }
        else {
            mascota.style.display = "none"
        }
    }   
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

async function getCiudades(url){
    const resp = await fetch(`${url}/ciudades`)
    const ciudades = resp.json()
    return ciudades
}

async function getRazas(url){
    const resp = await fetch(`${url}/razas`)
    const razas = resp.json()
    return razas
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
        const ciudades = await getCiudades(url)
        const razas = await getRazas(url)
        const mascotas = await getMascotas(url)
        mostrarCiudades(ciudades)
        mostrarRazas(razas)
        mostrarMascotas(mascotas)
        document.getElementById("inicio").href = "inicio.html?username=" + getDataUrl()
    }
}

main()