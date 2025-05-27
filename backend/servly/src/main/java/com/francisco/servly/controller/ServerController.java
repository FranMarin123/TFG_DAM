package com.francisco.servly.controller;

import com.francisco.servly.model.Server;
import com.francisco.servly.services.interfaces.IServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/servers")
public class ServerController {

    @Autowired
    private IServerService serverService;

    @GetMapping
    public List<Server> getAll() {
        return serverService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Server> getById(@PathVariable int id) {
        return serverService.getById(id);
    }

    @PostMapping
    public Server save(@RequestBody Server server) {
        return serverService.save(server);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        serverService.delete(id);
    }
}
