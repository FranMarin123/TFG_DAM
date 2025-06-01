package com.francisco.servly.controller;

import com.francisco.servly.model.dto.ServerCommandScriptDto;
import com.francisco.servly.model.dto.ServerIPCredentialDto;
import com.francisco.servly.model.dto.ServerPostDto;
import com.francisco.servly.model.entity.Script;
import com.francisco.servly.model.entity.Server;
import com.francisco.servly.model.entity.User;
import com.francisco.servly.services.implement.ServerCommandsService;
import com.francisco.servly.services.interfaces.IScriptService;
import com.francisco.servly.services.interfaces.IServerService;
import com.francisco.servly.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/servers")
public class ServerController {

    @Autowired
    private IServerService serverService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IScriptService scriptService;

    @Autowired
    private ServerCommandsService serverCommandsService;


    @GetMapping
    public List<Server> getAll() {
        return serverService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Server> getById(@PathVariable int id) {
        return serverService.getById(id);
    }

    @PostMapping
    public Server save(@RequestBody ServerPostDto server) {
        Server serverToSave = new Server(server.getName(), server.getAddress(), 22, server.getType());
        User user=userService.getByToken(server.getToken());
        serverToSave.getUsers().add(user);
        return serverService.save(serverToSave);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        serverService.delete(id);
    }

    @PostMapping("/reboot")
    public ResponseEntity<?> reboot(@RequestBody ServerIPCredentialDto serverIPCredentialDto) {
        if ( serverIPCredentialDto==null
                || serverIPCredentialDto.getServerIP() == null || serverIPCredentialDto.getServerIP().isEmpty()
                || serverIPCredentialDto.getPassword() == null || serverIPCredentialDto.getPassword().isEmpty()
                || serverIPCredentialDto.getUsername() == null || serverIPCredentialDto.getUsername().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error, datos del servidor incorrectos");
        }

        try {
            serverCommandsService.rebootServer(serverIPCredentialDto.getServerIP(),serverIPCredentialDto.getUsername(),serverIPCredentialDto.getPassword());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al reiniciar el servidor");
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/command")
    public ResponseEntity<?> execCommand(@RequestBody ServerCommandScriptDto serverIPCredentialDto) {
        if ( serverIPCredentialDto==null
                || serverIPCredentialDto.getServerIP() == null || serverIPCredentialDto.getServerIP().isEmpty()
                || serverIPCredentialDto.getPassword() == null || serverIPCredentialDto.getPassword().isEmpty()
                || serverIPCredentialDto.getUsername() == null || serverIPCredentialDto.getUsername().isEmpty()
                || serverIPCredentialDto.getCommand() == null || serverIPCredentialDto.getCommand().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error, datos del servidor incorrectos");
        }

        try {
            String output = serverCommandsService.executeCommand(
                    serverIPCredentialDto.getServerIP(),
                    serverIPCredentialDto.getUsername(),
                    serverIPCredentialDto.getPassword(),
                    serverIPCredentialDto.getCommand()
            );
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al ejecutar el comando en el servidor");
        }
    }

    @PostMapping("/shutdown")
    public ResponseEntity<?> shutdown(@RequestBody ServerIPCredentialDto serverIPCredentialDto) {
        if ( serverIPCredentialDto==null
                || serverIPCredentialDto.getServerIP() == null || serverIPCredentialDto.getServerIP().isEmpty()
                || serverIPCredentialDto.getPassword() == null || serverIPCredentialDto.getPassword().isEmpty()
                || serverIPCredentialDto.getUsername() == null || serverIPCredentialDto.getUsername().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error, datos del servidor incorrectos");
        }

        try {
            serverCommandsService.shutdownServer(serverIPCredentialDto.getServerIP(),serverIPCredentialDto.getUsername(),serverIPCredentialDto.getPassword());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al reiniciar el servidor");
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/script")
    public ResponseEntity<?> execScript(@RequestBody ServerCommandScriptDto serverIPCredentialDto) {
        if ( serverIPCredentialDto==null
                || serverIPCredentialDto.getServerIP() == null || serverIPCredentialDto.getServerIP().isEmpty()
                || serverIPCredentialDto.getPassword() == null || serverIPCredentialDto.getPassword().isEmpty()
                || serverIPCredentialDto.getUsername() == null || serverIPCredentialDto.getUsername().isEmpty()
                || serverIPCredentialDto.getCommand() == null || serverIPCredentialDto.getCommand().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error, datos del servidor incorrectos");
        }

        try {
            String output = serverCommandsService.executeScript(
                    serverIPCredentialDto.getServerIP(),
                    serverIPCredentialDto.getUsername(),
                    serverIPCredentialDto.getPassword(),
                    serverIPCredentialDto.getCommand()
            );
            if (scriptService.getByContentAndServer(serverIPCredentialDto.getCommand(),
                    serverService.getByIP(serverIPCredentialDto.getServerIP()).get().getId())==null) {
                scriptService.save(new Script("Script" + scriptService.getAll().size() + 1, serverIPCredentialDto.getCommand()
                        , serverService.getByIP(serverIPCredentialDto.getServerIP()).get()));
            }
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al ejecutar el comando en el servidor");
        }
    }

    @PostMapping("/metrics")
    public ResponseEntity<?> metrics(@RequestBody ServerIPCredentialDto serverIPCredentialDto) {
        if ( serverIPCredentialDto==null
                || serverIPCredentialDto.getServerIP() == null || serverIPCredentialDto.getServerIP().isEmpty()
                || serverIPCredentialDto.getPassword() == null || serverIPCredentialDto.getPassword().isEmpty()
                || serverIPCredentialDto.getUsername() == null || serverIPCredentialDto.getUsername().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error, datos del servidor incorrectos");
        }

        try {
            return ResponseEntity.ok(serverCommandsService.getServerMetrics(serverIPCredentialDto.getServerIP(),
                    serverIPCredentialDto.getUsername(),serverIPCredentialDto.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al obtener metricas del servidor");
        }
    }

    @PostMapping("/checkConnection")
    public ResponseEntity<?> check(@RequestBody ServerIPCredentialDto serverIPCredentialDto) {
        if ( serverIPCredentialDto==null
                || serverIPCredentialDto.getServerIP() == null || serverIPCredentialDto.getServerIP().isEmpty()
                || serverIPCredentialDto.getPassword() == null || serverIPCredentialDto.getPassword().isEmpty()
                || serverIPCredentialDto.getUsername() == null || serverIPCredentialDto.getUsername().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error, datos del servidor incorrectos");
        }

        try {
            return ResponseEntity.ok(serverCommandsService.checkConnection(serverIPCredentialDto.getServerIP()
                    ,serverIPCredentialDto.getUsername(),serverIPCredentialDto.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede conectar con el servidor");
        }
    }
}
