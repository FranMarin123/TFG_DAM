package com.francisco.servly.services.interfaces;

import com.francisco.servly.model.entity.Server;

import java.util.List;
import java.util.Optional;

public interface IServerService {
    List<Server> getAll();
    Optional<Server> getById(int id);
    Server save(Server server);
    void delete(int id);
    Optional<Server> getByIP(String ipToBrowse);
}
