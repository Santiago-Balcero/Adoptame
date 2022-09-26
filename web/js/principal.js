const url = "http://localhost:8080/adoptame/usuarios"

async function iniciarSesion(e){
    e.preventDefault()
    const form = e.target
    const username = form.documento.value
    const password =form.contrasena.value
    try{
    var user = await getUser(username)
    }
    catch {
        loginError()
    }
    const pass = await hashPass(password)
    if(pass == user.contrasena) {
        sessionStorage.setItem("AuthenticationState", "Authenticated")
        window.location.href = "inicio.html?username=" + user.username
    }
    else {
        loginError()
    }
}

function loginError() {
    const section = document.getElementById('alert-cont')
        section.innerHTML = `
        <div class="alert alert-danger" role="alert">
        Usuario o contraseña incorrectos.
        </div>`   
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
    const pass = await resp.text()
    return pass
}

function main(){
    sessionStorage.clear()
}

main()