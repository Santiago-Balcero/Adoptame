const url = "http://localhost:8080/adoptame/usuarios"

let UPDATE_PERSON = {
    update: false,
    username: null
}

async function getData(e) {
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
        contrasena: form.contrasena.value,
        foto: form.foto.src,
        biografia: form.biografia.value
    }
    if (UPDATE_PERSON.update) {
        document.getElementById("inicio").href = "inicio.html?username=" + usuario.username
        var texto = await updateUsuario(usuario)
    }
    else {
        document.getElementById("inicio").href = "principal.html"
        var texto = await crearUsuario(usuario)
        sessionStorage.setItem("AuthenticationState", "Authenticated") 
    }
    notRequiredInputs()
    const section = document.getElementById('alert-cont')
    const alerta = `
        <div class="alert alert-success" role="alert">
            ${texto}<button class="alert-link" id="ir-perfil" onclick="loadInicio(${usuario.username})">Ir al perfil.</button>
        </div>
        `
    section.innerHTML = alerta
    clearInputs(form)
}

async function crearUsuario(usuario) {
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

async function updateUsuario(usuario) {
    const resp = await fetch(url, {
        method: "PUT",
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

function clearInputs(form) {
    form.tipoId.value = ""
    form.email.value = ""
    form.username.value = ""
    form.telefono.value = ""
    form.nombres.value = ""
    form.ciudad.value = ""
    form.apellidos.value = ""
    form.contrasena.value = ""
    form.biografia.value = ""
    form.foto.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png"
}

async function getUsuario(username) {
    const resp = await fetch(`${url}/${username}`, {
        method: "GET"
    })
    const user = await resp.json()
    return user
}

async function getDataURL() {
    const search = window.location.search
    const urlHTML = new URLSearchParams(search)
    const username = urlHTML.get("username")
    if (username) {
        const usuario = await getUsuario(username)
        document.getElementById("update-text").innerText = "Actualiza solo la información que necesites."
        document.getElementById("tipoId-input").setAttribute("value", usuario.tipo_documento)
        document.getElementById("tipoId-input").setAttribute("disabled", "")
        document.getElementById("email-input").setAttribute("value", usuario.email)
        document.getElementById("username-input").setAttribute("value", usuario.username)
        document.getElementById("username-input").setAttribute("disabled", "")
        document.getElementById("telefono-input").setAttribute("value", usuario.telefono)
        document.getElementById("nombres-input").setAttribute("value", usuario.nombres)
        document.getElementById("ciudad-input").setAttribute("value", usuario.ciudad)
        document.getElementById("apellidos-input").setAttribute("value", usuario.apellidos)
        document.getElementById("biografia-input").value = usuario.biografia
        document.getElementById("contrasena-lbl").innerText = "Confirmar o cambiar contraseña:"
        document.getElementById("btn-foto").value = "Actualizar foto"
        if (usuario.foto != null) {
            document.getElementById("form-foto").setAttribute("src", usuario.foto)
        }
        UPDATE_PERSON.update = true
        UPDATE_PERSON.username = usuario.username
        document.getElementById("btn-create-user").setAttribute("value", "Actualizar")
    }
}

//Funcion que hace que los inputs ya no sean obligatorios
function notRequiredInputs() {
    document.getElementById("tipoId-input").required = false
    document.getElementById("email-input").required = false
    document.getElementById("username-input").required = false
    document.getElementById("telefono-input").required = false
    document.getElementById("nombres-input").required = false
    document.getElementById("ciudad-input").required = false
    document.getElementById("apellidos-input").required = false
    document.getElementById("contrasena-input").required = false
    document.getElementById("biografia-input").required = false
}

getDataURL()
