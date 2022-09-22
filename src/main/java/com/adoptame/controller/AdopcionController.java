package com.adoptame.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adoptame.model.Adopcion;
import com.adoptame.services.AdopcionService;

@RestController
@RequestMapping("/adoptame/adopcion")
public class AdopcionController {
    private AdopcionService adopcionService;

    public AdopcionController(){
        adopcionService = new AdopcionService();
    }

    @PostMapping
    public String createAdopcion(@RequestBody Adopcion adopcion) {
        return adopcionService.createAdopcion(adopcion);
    }

}
