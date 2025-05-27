package com.francisco.servly.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.Objects;

@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalTime time;
    private String status;
    private int cpuPercent;
    private int ramPercent;
    private int diskPercent;

    @ManyToOne
    @JoinColumn(name = "server_id", nullable = false)
    @JsonIgnore
    private Server server;

    public Report(LocalTime time, String status, int cpuPercent, int ramPercent, int diskPercent, Server server) {
        this.time = time;
        this.status = status;
        this.cpuPercent = cpuPercent;
        this.ramPercent = ramPercent;
        this.diskPercent = diskPercent;
        this.server = server;
    }

    public Report(int id, LocalTime time, String status, int cpuPercent, int ramPercent, int diskPercent, Server server) {
        this.id = id;
        this.time = time;
        this.status = status;
        this.cpuPercent = cpuPercent;
        this.ramPercent = ramPercent;
        this.diskPercent = diskPercent;
        this.server = server;
    }

    public Report() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getCpuPercent() {
        return cpuPercent;
    }

    public void setCpuPercent(int cpuPercent) {
        this.cpuPercent = cpuPercent;
    }

    public int getRamPercent() {
        return ramPercent;
    }

    public void setRamPercent(int ramPercent) {
        this.ramPercent = ramPercent;
    }

    public int getDiskPercent() {
        return diskPercent;
    }

    public void setDiskPercent(int diskPercent) {
        this.diskPercent = diskPercent;
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
        Report report = (Report) o;
        return Objects.equals(time, report.time) && Objects.equals(server, report.server);
    }

    @Override
    public int hashCode() {
        return Objects.hash(time, server);
    }

    @Override
    public String toString() {
        return "Report{" +
                "id=" + id +
                ", time=" + time +
                ", status='" + status + '\'' +
                ", cpuPercent=" + cpuPercent +
                ", ramPercent=" + ramPercent +
                ", diskPercent=" + diskPercent +
                ", server=" + server +
                '}';
    }
}
