package com.adoptame.controller;

import java.security.NoSuchAlgorithmException;
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
@RequestMapping("/adoptame")
public class UsuarioController {
    private UsuarioService service;
    private ContrasenaController pass;
    

    public UsuarioController() {
        service = new UsuarioService();
        pass = new ContrasenaController();
    }

    //Decorador para indicar que este método se ejecuta cuando la petición HTTP es GET
    @GetMapping("/usuarios")
    //Decorador para dar acceso desde cualquier url, añadirlo a cada método dependiendo de los permisos que se quieran dar
    //@CrossOrigin("*")
    public List<Usuario> getListaUsuarios() {
        return service.getListaUsuarios();
    }

    @GetMapping
    public Usuario getUsuario(@PathVariable(name = "username") String username) {
        return service.getUsuario(username);
    }

    @PostMapping
    public String createUsuario(@RequestBody Usuario usuario) throws NoSuchAlgorithmException {
        if(pass.checkContrasena(usuario.getContrasena())) {
            usuario.setContrasena(pass.toHexString(pass.getSHA(usuario.getContrasena())));
            return service.createUsuario(usuario);
        }
        return "Contraseña no válida.";
    }

    @PutMapping
    @CrossOrigin("*")
    public String updateUsuario(@RequestBody Usuario usuario) {
        return service.updateUsuario(usuario);
    }

    @DeleteMapping("/{username}")
    @CrossOrigin("*")
    public String deleteUsuario(@PathVariable(name="username")String username) {
        return service.deleteUsuario(username);
    }
}
