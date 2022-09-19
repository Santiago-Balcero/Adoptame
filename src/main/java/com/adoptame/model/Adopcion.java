package com.adoptame.model;

import java.util.Calendar;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="adopcion")
public class Adopcion {
    @Id
    private int idadopcion;
    private String username_registro;
    private String username_adoptante;
    private int idmascota;
    private Calendar fecha_adopcion;
    private String estadoadopcion;

    public Adopcion(String username_registro, String username_adoptante, int idmascota, Calendar fecha_adopcion, String estadoadopcion) {
        this.username_registro = username_registro;
        this. username_adoptante = username_adoptante;
        this.idmascota = idmascota;
        this.fecha_adopcion = fecha_adopcion;
        this.estadoadopcion = estadoadopcion;
    }
    
    public Adopcion() {
    }

    @Override
    public String toString() {
        String info = "----------------------------------------\n";
        info += "Id adopción: " + idadopcion;
        info += "Id usuario que registró mascota: " + username_registro;
        info += "\nId usuario que adopta: " + username_adoptante;
        info += "\nId mascota: " + idmascota;
        info += "\nFecha adopción: " + fecha_adopcion;
        info += "\nEstado de adopción: " + estadoadopcion;
        info += "\n----------------------------------------\n";
        return info;
    }

    public int getIdadopcion() {
        return idadopcion;
    }

    public void setIdadopcion(int idadopcion) {
        this.idadopcion = idadopcion;
    }

    public String getUsername_registro() {
        return username_registro;
    }

    public void setUsername_registro(String username_registro) {
        this.username_registro = username_registro;
    }

    public String getUsername_adoptante() {
        return username_adoptante;
    }

    public void setUsername_adoptante(String username_adoptante) {
        this.username_adoptante = username_adoptante;
    }

    public int getIdmascota() {
        return idmascota;
    }

    public void setIdmascota(int idmascota) {
        this.idmascota = idmascota;
    }

    public Calendar getFecha_adopcion() {
        return fecha_adopcion;
    }

    public void setFecha_adopcion(Calendar fecha_adopcion) {
        this.fecha_adopcion = fecha_adopcion;
    }

    public String getEstadoadopcion() {
        return estadoadopcion;
    }

    public void setEstadoadopcion(String estadoadopcion) {
        this.estadoadopcion = estadoadopcion;
    }
}
