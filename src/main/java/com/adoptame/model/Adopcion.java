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
    private String idusername;
    private int idmascota;
    private Calendar fecha_adopcion;
    private String estadoadopcion;

    public Adopcion(String idusername, int idmascota, Calendar fecha_adopcion, String estadoadopcion) {
        this.idusername = idusername;
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
        info += "\nId usuario que adopta: " + idusername;
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

    public String getIdusername() {
        return idusername;
    }

    public void setIdusername(String idusername) {
        this.idusername = idusername;
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
