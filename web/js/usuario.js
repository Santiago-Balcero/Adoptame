const url ="http://localhost:8080/adoptame/usuarios"

async function getData(e){
    e.preventDefault()
    const form = e.target
    const usuario = {
        tipo_documento: form.tipoId.value,
        email: form.email.value,
        username: form.username.value,
        telefono: form.telefono.value,
        nombres: form.nombres.value,
        ciudad: form.ciudad.value,
        apellidos: form.apellidos.value,
        contrasena: form.contrasena.value
    }
    const texto = await crearUsuario(usuario)   
    const section = document.getElementById('alert-cont')
    const alerta = `
    <div class="alert alert-success" role="alert">
        ${texto}<button class="alert-link" onclick='loadInicio(${usuario.username})'>Ir al perfil.</button>
    </div>
    `
    section.innerHTML = alerta
    clearInputs(form)
}

async function crearUsuario(usuario){
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    const text = await resp.text()
    return text
}

function loadInicio(username) {
    window.location.href = "inicio.html?username=" + username
}

function clearInputs (form) {
    form.tipoId.value = ""
    form.email.value = ""
    form.username.value = ""
    form.telefono.value = ""
    form.nombres.value = ""
    form.ciudad.value = ""
    form.apellidos.value = ""
    form.contrasena.value = ""
}

