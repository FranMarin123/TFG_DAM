package com.francisco.servly.controller;

import com.francisco.servly.model.Script;
import com.francisco.servly.services.interfaces.IScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/scripts")
public class ScriptController {

    @Autowired
    private IScriptService scriptService;

    @GetMapping
    public List<Script> getAll() {
        return scriptService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Script> getById(@PathVariable int id) {
        return scriptService.getById(id);
    }

    @PostMapping
    public Script save(@RequestBody Script script) {
        return scriptService.save(script);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        scriptService.delete(id);
    }
}
