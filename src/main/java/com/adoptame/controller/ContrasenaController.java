package com.adoptame.controller;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class ContrasenaController {
    
    //Métodos para hash al string de contraseña de usuario
    public byte[] getSHA(String input) throws NoSuchAlgorithmException {
        // Static getInstance method is called with hashing SHA
        MessageDigest md = MessageDigest.getInstance("SHA-256");
 
        // digest() method called
        // to calculate message digest of an input
        // and return array of byte
        return md.digest(input.getBytes(StandardCharsets.UTF_8));
    }
     
    public String toHexString(byte[] hash) {
        // Convert byte array into signum representation
        BigInteger number = new BigInteger(1, hash);
 
        // Convert message digest into hex value
        StringBuilder hexString = new StringBuilder(number.toString(16));
 
        // Pad with leading zeros
        while (hexString.length() < 64)
        {
            hexString.insert(0, '0');
        }
        return hexString.toString();
    }
    
    public boolean checkContrasena(String contrasena){
        char ch;
        boolean largoOk = false;
        boolean mayusOk = false;
        boolean minusOk = false;
        boolean numOk = false;
        boolean espaciosOk = false;
        if (contrasena.length() >= 8){
            largoOk = true;
        }
        for (int i = 0; i < contrasena.length(); i ++) {
            ch = contrasena.charAt(i);
            if (Character.isUpperCase(ch)) {
                mayusOk = true;
            }
            if (Character.isLowerCase(ch)) {
                minusOk = true;
            }
            if (Character.isDigit(ch)) {
                numOk = true;
            }
            if (Character.isSpaceChar(ch)) {
                espaciosOk = true;
            }
        }
        return (largoOk && mayusOk && minusOk && numOk && !espaciosOk);
    }
}