package com.adoptame.services;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.adoptame.model.Mascota;

public class MascotaService {
    private SessionFactory factory;

    public MascotaService() {
        try {
            factory = new Configuration()
            .configure("cfg.xml")
            .addAnnotatedClass(Mascota.class)
            .buildSessionFactory();
            System.out.println("Conexion establecida");
        } catch (Exception e) {
            System.out.println("Error en la conexion");
        }
    }

    public List<Mascota> getListaMascotas(String username) {
        List<Mascota> mascotas = new ArrayList<Mascota>();
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            String sql = String.format("FROM Mascota WHERE adopcion = 0 and idcontacto != '%s'", username);
            mascotas = session.createQuery(sql, Mascota.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        session.close();
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
        List<Mascota> mascotas = new ArrayList<Mascota>();
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            String sql = String.format("FROM Mascota WHERE idcontacto='%s'", idcontacto);
            mascotas = session.createQuery(sql, Mascota.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        session.close();
        return mascotas;
    }

    public List<Mascota> getCiudades() {
        List<Mascota> ciudades = new ArrayList<Mascota>();
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            String sql= "FROM Mascota GROUP BY ciudad";
            ciudades=session.createQuery(sql, Mascota.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        session.close();
        return ciudades;
    }

    public List<Mascota> getRazas() {
        List<Mascota> razas = new ArrayList<Mascota>();
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            String sql= "FROM Mascota GROUP BY raza";
            razas=session.createQuery(sql, Mascota.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        session.close();
        return razas;
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
        Mascota mascota = getMascota(idmascota);
        Session session = factory.openSession();
        session.beginTransaction();
        try {
            session.remove(mascota);
            session.getTransaction().commit();
            message = "Mascota eliminada con éxito.";
        }
        catch (Exception e) {
            message = "Error al eliminar a la mascota de la base de datos:\n" + e.getMessage();
        }
        session.close();
        return message;
    }
}
