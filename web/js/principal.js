const url = "http://localhost:8080/adoptame/usuarios"

async function iniciarSesion(e){
    e.preventDefault()
    const form = e.target
    const username =form.documento.value
    const password =form.contrasena.value
    const user = await getUser(username)
    const pass = await hashPass(password)
    if(pass == user.contrasena) {
        window.location.href = "inicio.html?username=" + user.username
    }
    else {
        alert("Usuario o contraseña incorrectos.")
    }
}

async function getUser(username){
    const resp = await fetch(`${url}/${username}`, {
        method: "GET"
    })
    const user = await resp.json()
    return user
}

async function hashPass(password){
    const resp = await fetch(`${url}/pass/${password}`, {
        method: "GET"
    })
    console.log(resp)
    const pass = await resp.text()
    console.log(pass)
    return pass
}

