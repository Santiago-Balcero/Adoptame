const url ="http://localhost:8080/adoptame/mascotas"

async function getData(e){
    e.preventDefault()
    const idcontacto = getDataUrl()
    const form = e.target
    const mascota = {
        especie: form.especie.value,
        salud: form.salud.value,
        raza: form.raza.value,
        ciudad: form.ciudad.value,
        tamanio: form.tamanio.value,
        cantidad: form.cantidad.value,
        color: form.color.value,
        edad: form.edad.value,
        nombre: form.nombre.value,
        foto: form.foto.value,
        idcontacto: idcontacto
    }

    const texto = await crearMascota(mascota)
    const section = document.getElementById('alert-cont')
    const alerta = `
    <div class="alert alert-success" role="alert">
        ${texto}
    </div>
    `
    section.innerHTML = alerta
    clearInputs(form)
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
    form.cantidad.value = ""
    form.color.value = ""
    form.edad.value = ""
    form.nombre.value = ""
    form.foto.value = ""
}

function getDataUrl () {
    const search = window.location.search
    const url = new URLSearchParams(search)
    const username = url.get("username")
    return username
}

function main() {
    if(sessionStorage.getItem("AuthenticationState") === null) {
        window.location.href = "principal.html"
    }
}

main()