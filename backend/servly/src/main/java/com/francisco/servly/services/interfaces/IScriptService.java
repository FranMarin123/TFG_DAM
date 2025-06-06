package com.francisco.servly.services.interfaces;

import com.francisco.servly.model.entity.Script;

import java.util.List;
import java.util.Optional;

public interface IScriptService {
    List<Script> getAll();
    Optional<Script> getById(int id);
    Script save(Script script);
    void delete(int id);
    Script getByContentAndServer(String content, int serverId);
}
