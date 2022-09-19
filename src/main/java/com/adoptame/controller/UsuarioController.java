package com.adoptame.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adoptame.model.Usuario;
import com.adoptame.services.UsuarioService;

//Decorador para que esta clase procese las peticiones HTTP
@RestController
@RequestMapping("/adoptame/usuarios")
public class UsuarioController {
    private UsuarioService userService;
    

    public UsuarioController() {
        userService = new UsuarioService();
    }

    //Decorador para indicar que este método se ejecuta cuando la petición HTTP es GET
    @GetMapping
    //Decorador para dar acceso desde cualquier url, añadirlo a cada método dependiendo de los permisos que se quieran dar
    //@CrossOrigin("*")
    public List<Usuario> getListaUsuarios() {
        return userService.getListaUsuarios();
    }

    @GetMapping("/{username}")
    public Usuario getUsuario(@PathVariable(name = "username") String username) {
        return userService.getUsuario(username);
    }

    @PostMapping
    public String createUsuario(@RequestBody Usuario usuario) {
        return userService.createUsuario(usuario);
    }

    @PutMapping
    @CrossOrigin("*")
    public String updateUsuario(@RequestBody Usuario usuario) {
        return userService.updateUsuario(usuario);
    }

    @DeleteMapping("/{username}")
    @CrossOrigin("*")
    public String deleteUsuario(@PathVariable(name="username")String username) {
        return userService.deleteUsuario(username);
    }
}
