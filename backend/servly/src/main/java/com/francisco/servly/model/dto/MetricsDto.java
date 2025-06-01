package com.francisco.servly.model.dto;

public class MetricsDto {
    private double cpu;
    private double memory;
    private double disk;
    private double net;

    public MetricsDto(double cpu, double memory, double disk, double net) {
        this.cpu = cpu;
        this.memory = memory;
        this.disk = disk;
        this.net = net;
    }

    public double getCpu() {
        return cpu;
    }

    public void setCpu(double cpu) {
        this.cpu = cpu;
    }

    public double getMemory() {
        return memory;
    }

    public void setMemory(double memory) {
        this.memory = memory;
    }

    public double getDisk() {
        return disk;
    }

    public void setDisk(double disk) {
        this.disk = disk;
    }

    public double getNet() {
        return net;
    }

    public void setNet(double net) {
        this.net = net;
    }
}
