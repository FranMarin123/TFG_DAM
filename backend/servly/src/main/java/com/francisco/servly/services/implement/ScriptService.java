package com.francisco.servly.services.implement;

import com.francisco.servly.model.entity.Script;
import com.francisco.servly.repository.ScriptRepository;
import com.francisco.servly.services.interfaces.IScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScriptService implements IScriptService {

    @Autowired
    private ScriptRepository scriptRepository;

    @Override
    public List<Script> getAll() {
        return scriptRepository.findAll();
    }

    @Override
    public Optional<Script> getById(int id) {
        return scriptRepository.findById(id);
    }

    @Override
    public Script save(Script script) {
        return scriptRepository.save(script);
    }

    @Override
    public void delete(int id) {
        scriptRepository.deleteById(id);
    }

    public Script getByContentAndServer(String content, int serverId) {
        return scriptRepository.findByContentAndServer_Id(content, serverId);
    }
}
