package com.francisco.servly.services.implement;

import com.francisco.servly.model.Server;
import com.francisco.servly.repository.ServerRepository;
import com.francisco.servly.services.interfaces.IServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServerService implements IServerService {

    @Autowired
    private ServerRepository serverRepository;

    @Override
    public List<Server> getAll() {
        return serverRepository.findAll();
    }

    @Override
    public Optional<Server> getById(int id) {
        return serverRepository.findById(id);
    }

    @Override
    public Server save(Server server) {
        return serverRepository.save(server);
    }

    @Override
    public void delete(int id) {
        serverRepository.deleteById(id);
    }
}
