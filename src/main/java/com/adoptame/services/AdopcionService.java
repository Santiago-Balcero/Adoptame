package com.adoptame.services;

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

    public String createMascota(Adopcion adopcion) {
        String message = "";
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            session.persist(adopcion);
            session.getTransaction().commit();
            message = "Registro de adopción realizado con éxito.";
        } catch (Exception e) {
            e.printStackTrace();
            message = "Error al registrar la adopción en la base de datos:\n" + e.getMessage();
        }
        session.close();
        return message;
    }
}
