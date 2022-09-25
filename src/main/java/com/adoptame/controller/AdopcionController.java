package com.adoptame.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adoptame.model.Adopcion;
import com.adoptame.model.Mascota;
import com.adoptame.services.AdopcionService;
import com.adoptame.services.MascotaService;

import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/adoptame/adopcion")
public class AdopcionController {
    private AdopcionService adopcionService;
    private MascotaService mascotaService;

    public AdopcionController(){
        adopcionService = new AdopcionService();
        mascotaService = new MascotaService();
    }

    @GetMapping("/username/{username}")
    @CrossOrigin("*")
    public List<Adopcion> getAdopcionesUsuario(@PathVariable(name="username") String username_adoptante) {
        return adopcionService.getAdopcionesUsuario(username_adoptante);
    }

    @GetMapping("/{idmascota}")
    @CrossOrigin("*")
    public Adopcion getAdopcionIdMascota(@PathVariable(name="idmascota") int idmascota) {
        return adopcionService.getAdopcionIdMascota(idmascota);
    }

    @PostMapping
    @CrossOrigin("*")
    public String createAdopcion(@RequestBody Adopcion adopcion) {
        Mascota mascota = mascotaService.getMascota(adopcion.getIdmascota());
        mascota.setAdopcion(1);
        mascotaService.updateMascota(mascota);
        adopcion.setFecha_adopcion(Calendar.getInstance());
        return adopcionService.createAdopcion(adopcion);
    }
}