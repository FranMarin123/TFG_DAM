package com.francisco.servly.model.dto;

import java.util.Objects;

public class ServerPostDto {
    private String name;
    private String address;
    private String type;
    private String token;

    public ServerPostDto(String name, String address, String type, String token) {
        this.name = name;
        this.address = address;
        this.type = type;
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ServerPostDto that = (ServerPostDto) o;
        return Objects.equals(name, that.name) && Objects.equals(address, that.address) && Objects.equals(type, that.type) && Objects.equals(token, that.token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, address, type, token);
    }

    @Override
    public String toString() {
        return "ServerPostDto{" +
                "name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", type='" + type + '\'' +
                ", idUser=" + token +
                '}';
    }
}
