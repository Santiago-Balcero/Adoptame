package com.adoptame.services;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.adoptame.model.Usuario;

public class UsuarioService {
    //Atributos
    private SessionFactory factory;

    public UsuarioService(){
        factory = new Configuration()
            .configure("cfg.xml")
            .addAnnotatedClass(Usuario.class)
            .buildSessionFactory();
    }

    public List<Usuario> getListaUsuarios() {
        List<Usuario> personas = new ArrayList<Usuario>();
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            personas = session.createQuery("from Usuario", Usuario.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return personas;
    }

    public Usuario getUsuario(String username) {
        Usuario usuario = new Usuario();
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            usuario = session.find(Usuario.class, username);
        } catch (Exception e) {
            e.printStackTrace();
        }
        session.close();
        return usuario;
    }

    public String createUsuario(Usuario usuario) {
        String message = "";
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            session.persist(usuario);
            session.getTransaction().commit();
            message = "Usuario creado con éxito.";
        } catch (Exception e) {
            e.printStackTrace();
            message = "Error al registrar al usuario en la base de datos:\n" + e.getMessage();
        }
        session.close();
        return message;
    }

    public String updateUsuario(Usuario usuario) {
        String message = "";
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            session.merge(usuario);
            session.getTransaction().commit();
            message = "Usuario actualizado con éxito.";
        } catch (Exception e) {
            message = "Error al actualizar al usuario en la base de datos:\n" + e.getMessage();
            e.printStackTrace();
        }
        session.close();
        return message;
    }

    public String deleteUsuario(String username) {
        String message = "";
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            Usuario usuario = getUsuario(username);
            session.remove(usuario);
            session.getTransaction().commit();
            session.close();
            message = "Usuario eliminado con éxito.";
        }
        catch (Exception e) {
            message = "Error al eliminar al usuario de la base de datos:\n" + e.getMessage();
        }
        return message;
    }


}