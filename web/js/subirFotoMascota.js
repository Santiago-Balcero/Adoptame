'use strict';

const botonFoto = document.getElementById("btn-foto-mascota")
const userFoto = document.getElementById("form-foto-mascota")

let widgetCloudinary = cloudinary.createUploadWidget({
    cloudName: "santiagobal",
    uploadPreset: "adoptameMascotas"
}, (error, result)=>{
    if(!error && result && result.event === "success") {
        userFoto.src = result.info.secure_url
    }
})

botonFoto.addEventListener('click', ()=>{
    widgetCloudinary.open()
}, false)