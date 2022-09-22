package com.adoptame.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adoptame.model.Adopcion;
import com.adoptame.services.AdopcionService;

import java.util.List;

@RestController
@RequestMapping("/adoptame/adopcion")
public class AdopcionController {
    private AdopcionService adopcionService;

    public AdopcionController(){
        adopcionService = new AdopcionService();
    }

    @GetMapping("/username/{username}")
    public List<Adopcion> getAdopcionesUsuario(@PathVariable(name="username") String username_adoptante) {
        return adopcionService.getAdopcionesUsuario(username_adoptante);
    }

    @PostMapping
    public String createAdopcion(@RequestBody Adopcion adopcion) {
        return adopcionService.createAdopcion(adopcion);
    }

}