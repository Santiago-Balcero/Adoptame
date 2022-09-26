const url ="http://localhost:8080/adoptame/mascotas"

let UPDATE_PET = {
    update: false,
    idmascota: null
}

async function getData(e){
    e.preventDefault()
    const idcontacto = getDataUrlUsername()
    const form = e.target
    var mascota = {
        especie: form.especie.value,
        salud: capitalizeFirstLetter(form.salud.value),
        raza: capitalizeFirstLetter(form.raza.value.replace(/\s/g, '')),
        ciudad: capitalizeFirstLetter(form.ciudad.value.replace(/\s/g, '')),
        tamanio: form.tamanio.value,
        cantidad: form.cantidad.value,
        sexo: form.sexo.value,
        color: capitalizeFirstLetter(form.color.value),
        edad: form.edad.value,
        nombre: capitalizeFirstLetter(form.nombre.value),
        foto: form.foto.src,
        idcontacto: idcontacto
    }
    if (UPDATE_PET.update) {
        mascota.idmascota = UPDATE_PET.idmascota
        var texto = await updateMascota(mascota)
    }
    else {
        var texto = await crearMascota(mascota)
    }
    const section = document.getElementById('alert-cont')
    const alerta = `
    <div class="alert alert-success" role="alert">
        ${texto}
    </div>
    `
    section.innerHTML = alerta
    clearInputs(form)
}

async function getMascota(idmascota){
    const resp = await fetch(`${url}/${idmascota}`, {
        method: "GET"
    })
    const mascota = resp.json()
    return mascota
}

async function updateMascota(mascota) {
    const resp = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mascota)
    })
    const text = await resp.text()
    return text
}

async function crearMascota(mascota){
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mascota)
    })
    const text = await resp.text()
    return text
}

function clearInputs (form) {
    form.especie.value = ""
    form.salud.value = ""
    form.raza.value = ""
    form.ciudad.value = ""
    form.tamanio.value = ""
    form.sexo.value = ""
    form.cantidad.value = ""
    form.color.value = ""
    form.edad.value = ""
    form.nombre.value = ""
    form.foto.src = "https://cdn-icons-png.flaticon.com/512/4225/4225925.png"
}

async function getDataUrlMascota() {
    const search = window.location.search
    const url = new URLSearchParams(search)
    var idmascota = url.get("idmascota")
    if(idmascota) {
        const mascota = await getMascota(idmascota)
        document.getElementById("update-text").innerText = "Actualiza solo la información que necesites."
        //Llenar el menú desplegable con la especie de la mascota
        let especieInput = document.getElementById("especie-input")
        especieInput.length = 0
        let especie = document.createElement('option')
        especie.text = mascota.especie
        especieInput.add(especie)
        especieInput.selectedIndex = 0;
        document.getElementById("especie-input").setAttribute("disabled", "")
        //Fin
        let sexoInput = document.getElementById("sexo-input")
        sexoInput.length = 0
        let sexo = document.createElement('option')
        sexo.text = mascota.sexo
        sexoInput.add(sexo)
        sexoInput.selectedIndex = 0
        document.getElementById("sexo-input").setAttribute("disabled", "")
        //Fin llenar menú con sexo de mascota
        document.getElementById("raza-input").setAttribute("value", mascota.raza)
        document.getElementById("raza-input").setAttribute("disabled", "")
        document.getElementById("color-input").setAttribute("value", mascota.color)
        document.getElementById("color-input").setAttribute("disabled", "")
        document.getElementById("ciudad-input").setAttribute("value", mascota.ciudad)
        //Llenar el menú desplegable con el tamaño de la mascota
        let tamanioInput = document.getElementById("tamanio-input")
        tamanioInput.length = 0
        let tamanio = document.createElement('option')
        tamanio.text = mascota.tamanio
        tamanioInput.add(tamanio)
        tamanioInput.selectedIndex = 0;
        document.getElementById("tamanio-input").setAttribute("disabled", "")
        //Fin
        document.getElementById("cantidad-input").setAttribute("value", mascota.cantidad)
        document.getElementById("edad-input").setAttribute("value", mascota.edad)
        document.getElementById("btn-foto-mascota").value = "Actualizar foto"
        if (mascota.nombre != null) {
            document.getElementById("nombre-input").setAttribute("value", mascota.nombre)
        }
        if (mascota.foto != null) {
            document.getElementById("form-foto-mascota").src = mascota.foto
        }
        document.getElementById("salud-input").value = mascota.salud
        UPDATE_PET.update = true
        UPDATE_PET.idmascota = mascota.idmascota
        document.getElementById("btn-update-mascota").setAttribute("value", "Actualizar")
    }
}

function getDataUrlUsername() {
    const search = window.location.search
    const url = new URLSearchParams(search)
    const username = url.get("username")
    return username
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function main() {
    if(sessionStorage.getItem("AuthenticationState") === null) {
        window.location.href = "principal.html"
    }
    const username = getDataUrlUsername()
    document.getElementById("inicio").href = "inicio.html?username=" + username
    document.getElementById("nosotros").href = "nosotros.html?username=" + username
    document.getElementById("ayuda").href = "ayuda.html?username=" + username
    getDataUrlMascota()
}

main()