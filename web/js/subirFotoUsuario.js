'use strict';

const botonFoto = document.getElementById("btn-foto")
const userFoto = document.getElementById("form-foto")

let widgetCloudinary = cloudinary.createUploadWidget({
    cloudName: "santiagobal",
    uploadPreset: "adoptameUsers"
}, (error, result)=>{
    if(!error && result && result.event === "success") {
        userFoto.src = result.info.secure_url
    }
})

botonFoto.addEventListener('click', ()=>{
    widgetCloudinary.open()
}, false)