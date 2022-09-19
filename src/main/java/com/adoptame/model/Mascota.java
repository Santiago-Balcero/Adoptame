package com.adoptame.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="mascota")
public class Mascota {
    @Id
    private int idmascota;
    private String especie;
    private String raza;
    private String color;
    private String tamanio;
    private int edad;
    private String nombre;
    private String salud;
    private String ciudad;
    private int cantidad;
    private int adopcion;
    private String foto;
    private String idcontacto;

    public Mascota(String especie, String salud, String raza, String ciudad, String tamanio, int cantidad, String color, int edad, String nombre, String foto, String idcontacto) {
        this.raza = raza;
        this.color = color;
        this.edad = edad;
        this.salud = salud;
        this.ciudad = ciudad;
        this.cantidad = cantidad;
        this.tamanio = tamanio;
        this.especie = especie;
        this.foto = foto;
        this.nombre = nombre;
        this.idcontacto = idcontacto;
    }

    public Mascota() {
    }

    @Override
    public String toString() {
        String info = "----------------------------------------\n";
        info += "Id mascota: " + idmascota;
        info += "\nEspecie: " + especie;
        info += "\nRaza: " + raza;
        info += "\nColor: " + color;
        info += "\nTamaño: " + tamanio;
        info += "\nEdad: " + edad;
        info += "\nNombre: " + nombre;
        info += "\nSalud: " + salud;
        info += "\nCiudad: " + ciudad;
        info += "\nCantidad: " + cantidad;
        info += "\nAdopción: " + adopcion;
        info += "\nFoto: " + foto;
        info += "\nId contacto: " + idcontacto;
        info += "\n----------------------------------------\n";
        return info;
    }

    public int getIdmascota() {
        return idmascota;
    }
    public void setIdmascota(int idmascota) {
        this.idmascota = idmascota;
    }
    public String getEspecie() {
        return especie;
    }
    public void setEspecie(String especie) {
        this.especie = especie;
    }
    public String getRaza() {
        return raza;
    }
    public void setRaza(String raza) {
        this.raza = raza;
    }
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    public String getTamanio() {
        return tamanio;
    }
    public void setTamanio(String tamanio) {
        this.tamanio = tamanio;
    }
    public int getEdad() {
        return edad;
    }
    public void setEdad(int edad) {
        this.edad = edad;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getSalud() {
        return salud;
    }
    public void setSalud(String salud) {
        this.salud = salud;
    }
    public String getCiudad() {
        return ciudad;
    }
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }
    public int getCantidad() {
        return cantidad;
    }
    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
    public int getAdopcion() {
        return adopcion;
    }
    public void setAdopcion(int adopcion) {
        this.adopcion = adopcion;
    }
    public String getFoto() {
        return foto;
    }
    public void setFoto(String foto) {
        this.foto = foto;
    }
    public String getIdcontacto() {
        return idcontacto;
    }
    public void setIdcontacto(String idcontacto) {
        this.idcontacto = idcontacto;
    }

    

}
