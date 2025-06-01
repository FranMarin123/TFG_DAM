package com.francisco.servly.model.dto;

import java.util.Objects;

public class ServerIPCredentialDto {
    private String serverIP;
    private String username;
    private String password;

    public ServerIPCredentialDto(String serverIP, String username, String password) {
        this.serverIP = serverIP;
        this.username = username;
        this.password = password;
    }

    public String getServerIP() {
        return serverIP;
    }

    public void setServerIP(String serverIP) {
        this.serverIP = serverIP;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ServerIPCredentialDto that = (ServerIPCredentialDto) o;
        return Objects.equals(serverIP, that.serverIP) && Objects.equals(username, that.username) && Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(serverIP, username, password);
    }
}
