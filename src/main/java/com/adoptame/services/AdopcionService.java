package com.adoptame.services;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.adoptame.model.Adopcion;

public class AdopcionService {
    private SessionFactory factory;

    public AdopcionService(){
        factory = new Configuration()
            .configure("cfg.xml")
            .addAnnotatedClass(Adopcion.class)
            .buildSessionFactory();
    }

    public List<Adopcion> getAdopcionesUsuario(String username_adoptante) {
        List<Adopcion> adopciones = new ArrayList<Adopcion>();
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            String sql= String.format("FROM Adopcion WHERE username_adoptante='%s'", username_adoptante);
            adopciones=session.createQuery(sql, Adopcion.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        session.close();
        return adopciones;
    }

    public String createAdopcion(Adopcion adopcion) {
        String message = "";
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            session.persist(adopcion);
            session.getTransaction().commit();
            message = "Adopción realizada con éxito.";
        } catch (Exception e) {
            e.printStackTrace();
            message = "Error al registrar la adopción en la base de datos:\n" + e.getMessage();
        }
        session.close();
        return message;
    }
}
