const url = "http://localhost:8080/adoptame/usuarios"

async function iniciarSesion(e){
    e.preventDefault()
    const form = e.target
    const username =form.documento.value
    const password =form.contrasena.value
    const usuario = await getUser(username)
    const passw = usuario.contrasena
    
    if(password==passw){
        window.location.href = "inicio.html?username=" + usuario.username
    }
    else {
        alert("Usuario o contraseña incorrectos")
    }
}

async function getUser(username){
    const resp = await fetch(`${url}/${username}`, {
        method: "GET"
    })
    const user = await resp.json()
    return user
}

