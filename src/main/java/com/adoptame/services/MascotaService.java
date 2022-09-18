package com.adoptame.services;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.adoptame.model.Usuario;
import com.adoptame.model.Mascota;

public class MascotaService {
    private SessionFactory factory;

    public MascotaService(){
        factory = new Configuration()
            .configure("cfg.xml")
            .addAnnotatedClass(Mascota.class)
            .buildSessionFactory();
    }

    public List<Mascota> getListaMascotas() {
        List<Mascota> mascotas = new ArrayList<Mascota>();
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            mascotas = session.createQuery("from Mascota", Mascota.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return mascotas;
    }

    public Mascota getMascota(int idmascota) {
        Mascota mascota = new Mascota();
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            mascota = session.find(Mascota.class, idmascota);
        } catch (Exception e) {
            e.printStackTrace();
        }
        session.close();
        return mascota;
    }

    public List<Mascota> getMascotasUsuario(String idcontacto) {
        List<Mascota> mascotas = new ArrayList<>();
        Session session = factory.openSession();
        session.beginTransaction();
        mascotas = session.createQuery("from Mascota where idcontacto = :u", Mascota.class)
                    .setParameter("u", idcontacto)
                    .list();
        return mascotas;
    }

    public String createMascota(Mascota mascota) {
        String message = "";
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            session.persist(mascota);
            session.getTransaction().commit();
            message = "Mascota creada con éxito.";
        } catch (Exception e) {
            e.printStackTrace();
            message = "Error al registrar a la mascota en la base de datos:\n" + e.getMessage();
        }
        session.close();
        return message;
    }

    public String updateMascota(Mascota mascota) {
        String message = "";
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            session.merge(mascota);
            session.getTransaction().commit();
            message = "Mascota actualizada con éxito.";
        } catch (Exception e) {
            message = "Error al actualizar a la mascota en la base de datos:\n" + e.getMessage();
            e.printStackTrace();
        }
        session.close();
        return message;
    }

    public String deleteMascota(int idmascota) {
        String message = "";
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            Mascota mascota = getMascota(idmascota);
            session.remove(mascota);
            session.getTransaction().commit();
            session.close();
            message = "Mascota eliminada con éxito.";
        }
        catch (Exception e) {
            message = "Error al eliminar a la mascota de la base de datos:\n" + e.getMessage();
        }
        return message;
    }
}
