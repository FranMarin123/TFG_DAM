package com.francisco.servly.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Server {
    private int id;
    private String name;
    private String address;
    private int port;
    private String type;
    private List<User> users;

    public Server(String name, String address, int port, String type) {
        this.id = -1;
        this.name = name;
        this.address = address;
        this.port = port;
        this.type = type;
        this.users = new ArrayList<>();
    }

    public Server(int id, String name, String address, int port, String type, List<User> users) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.port = port;
        this.type = type;
        this.users = users;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Server server = (Server) o;
        return Objects.equals(address, server.address);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(address);
    }

    @Override
    public String toString() {
        return "Server{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", port=" + port +
                ", type='" + type + '\'' +
                ", users=" + users +
                '}';
    }
}
