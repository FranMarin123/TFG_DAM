package com.francisco.servly.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Script {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String content;

    @ManyToOne
    @JoinColumn(name = "server_id", nullable = false)
    @JsonIgnore
    private Server server;

    public Script(String title, String content) {
        this.id=-1;
        this.title = title;
        this.content = content;
    }

    public Script(int id, String title, String content, Server server) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.server = server;
    }

    public Script(String title, String content, Server server) {
        this.title = title;
        this.content = content;
        this.server = server;
    }

    public Script() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Server getServer() {
        return server;
    }

    public void setServer(Server server) {
        this.server = server;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Script script = (Script) o;
        return Objects.equals(title, script.title) && Objects.equals(server, script.server);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, server);
    }

    @Override
    public String toString() {
        return "Script{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", server=" + server +
                '}';
    }
}
