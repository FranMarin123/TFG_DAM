package com.francisco.servly.controller;

import com.francisco.servly.model.dto.UserLoginDto;
import com.francisco.servly.model.entity.User;
import com.francisco.servly.services.interfaces.IUserService;
import com.francisco.servly.utils.JWTUtils;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserService userService;
    @Autowired
    private JWTUtils jwtUtils;

    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getById(@PathVariable int id) {
        return userService.getById(id);
    }

    @PostMapping
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        userService.delete(id);
    }

    @GetMapping("/proveSesion/{token}")
    public boolean getProveSession(@PathVariable String token) {
        return jwtUtils.validateToken(token);
    }

    @GetMapping("/getUserByToken/{token}")
    public ResponseEntity<?> getUserByToken(@PathVariable String token) {
        User user = userService.getByToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/Register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar el usuario");
        } else if (user.getEmail()==null || user.getEmail().trim().equals("")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El email no puede estar vacio");
        } else if (user.getPassword()==null || user.getPassword().trim().equals("")) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La contraseña no puede estar vacia");
        } else if (user.getName()==null || user.getName().trim().equals("")) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El nombre no puede estar vacio");
        }

        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));

        User newUser = userService.save(user);

        if (newUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario ya registrado");
        }

        String token=jwtUtils.generateToken(newUser.getEmail());

        return ResponseEntity.ok(token);
    }

    @PostMapping("/LoginProve")
    public ResponseEntity<?> loginProve(@RequestBody UserLoginDto userLoginDto) {
        if (userLoginDto==null || userLoginDto.getEmail()==null || userLoginDto.getPassword()==null
                || userLoginDto.getEmail().trim().equals("") || userLoginDto.getPassword().trim().equals("")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al iniciar sesión");
        }

        User userFromDatabase=userService.proveLogin(userLoginDto);

        if (userFromDatabase==null || !BCrypt.checkpw(userLoginDto.getPassword(), userFromDatabase.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al iniciar sesión");
        }

        String token=jwtUtils.generateToken(userFromDatabase.getEmail());

        return ResponseEntity.ok(token);
    }

}
