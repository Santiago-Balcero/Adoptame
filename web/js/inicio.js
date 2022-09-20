const url = "http://localhost:8080/adoptame/usuarios"
const url2 = "http://localhost:8080/adoptame/mascotas"

function mostrarPerfil(usuario){
    const section = document.getElementById('profile-card')
    let imagen = ''
    let bio = ''
    if (usuario.foto==null){
        imagen = 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
    }
    else{
        imagen=usuario.foto
    }
    if(usuario.biografia==null){
        bio = 'Escribe algo sobre ti.'
    }
    else{
        bio = usuario.biografia
    }
    let perfil = `
        <img src="${imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${usuario.nombres} ${usuario.apellidos}</h5>
            <p class="card-text">${bio}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><img src="./img/envelope.png" class="img-fluid" alt="email.jpg"></span>
            <label for="exampleFormControlInput1" class="form-label">${usuario.email}</label>
            </div></li>
            <li class="list-group-item"><div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><img src="./img/telephone.png" class="img-fluid" alt="tel.jpg"></span>
            <label for="exampleFormControlInput1" class="form-label">${usuario.telefono}</label>
            </div></li>
            <li class="list-group-item"><div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><img src="./img/location.png" class="img-fluid" alt="location.jpg"></span>
            <label for="exampleFormControlInput1" class="form-label">${usuario.ciudad}</label>
            </div></li>
        </ul>
        <div class="card-body-btn">
            <a href="#" class="btn btn-primary">Editar perfil</a>
        </div>
    `
    section.innerHTML = perfil
}

function mostrarMascotas(mascotas){
    const section = document.getElementById('profile-tab-pane')
    let card = '<div class="row row-cols-1 row-cols-md-2 g-4">'
    if(mascotas.length==0){
        section.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Aún no has registrado ninguna mascota.</h5>
                <p class="card-text">Comienza ahora:</p>
                <a class="btn btn-primary" onclick="registrarMascota()">Registrar</a>
            </div>
        </div>`
    }
    else if (mascotas.length==1){
        const mascota = mascotas[0]
        card+=`
        <div class="col">
        <div class="card blog-card" id="mascota-card">
          <img src="${mascota.foto}" class="card-img-top img-blog img-mascota" alt="perro.jpg">
          <div class="card-body">
            <a href="#" class="blog-card-title">${mascota.nombre}</a>
            <p class="card-text">Raza: ${mascota.raza}</p>
            <p class="card-text">Edad: ${mascota.edad} meses</p>
            <p class="card-text">Ciudad: ${mascota.ciudad}</p>
          </div>
        </div>
      </div>
        `
    }
    else {
        for(let i = 0; i < mascotas.length; i++){
            const mascota = mascotas[i]
            card+=`
            <div class="col">
                <div class="card blog-card" id="mascota-card">
                <img src="${mascota.foto}" class="card-img-top img-blog img-mascota" alt="perro.jpg">
                    <div class="card-body">
                        <a href="#" class="blog-card-title">${mascota.nombre}</a>
                        <p class="card-text">Raza: ${mascota.raza}</p>
                        <p class="card-text">Edad: ${mascota.edad} meses</p>
                        <p class="card-text">Ciudad: ${mascota.ciudad}</p>
                    </div>
                </div>
            </div>
            `
        }
    }
    card+='</div>'
    section.innerHTML = card

}

async function getUser(username){
    const resp = await fetch(`${url}/${username}`, {
        method: "GET"
    })
    const user = resp.json()
    return user
}

async function getMascotasIdcontacto(username){
    const resp = await fetch(`${url2}/username/${username}`, {
        method: "GET"
    })
    const mascotas = resp.json()
    return mascotas
}

function registrarMascota(username){
    window.location.href = "mascota.html?username=" + username
}

function getDataUrl () {
    const search = window.location.search
    const urlHTML = new URLSearchParams(search)
    const username = urlHTML.get("username")
    return username
}

async function main() {
    if(sessionStorage.getItem("AuthenticationState") === null) {
        window.location.href = "principal.html"
    }
    else {
        const username = getDataUrl()
        const usuario = await getUser(username)
        const mascotas = await getMascotasIdcontacto(username)
        mostrarPerfil(usuario)
        mostrarMascotas(mascotas)
    }
}

main()