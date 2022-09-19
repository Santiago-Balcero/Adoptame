package com.adoptame.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="usuario")
public class Usuario {
    @Id
    private String username;
    private String tipo_documento;
    private String contrasena;
    private String nombres;
    private String apellidos;
    private String email;
    private String telefono;
    private String ciudad;
    private String foto;
    private String biografia;

    public Usuario(String username, String tipo_documento, String nombres, String apellidos, String contrasena, String email,  String telefono,  String ciudad){
        this.username = username;
        this.tipo_documento = tipo_documento;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.contrasena = contrasena;
        this.email = email;
        this.telefono = telefono;
        this.ciudad = ciudad;
    }

    public Usuario() {
    }

    @Override
    public String toString() {
        String info = "----------------------------------------\n";
        info += "Username: " + username;
        info += "\nTipo de Documento: " + tipo_documento;
        info += "\nNombres: " + nombres;
        info += "\nApellidos: " + apellidos;
        info += "\nEmail: " + email;
        info += "\nTeléfono: " + telefono;
        info += "\nCiudad: " + ciudad;
        info += "\nFoto: " + foto;
        info += "\nBiografía: " + biografia;
        info += "\n----------------------------------------\n";
        return info;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTipo_documento() {
        return tipo_documento;
    }

    public void setTipo_documento(String tipo_documento) {
        this.tipo_documento = tipo_documento;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getBiografia() {
        return biografia;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    
}