package com.francisco.servly.services.interfaces;

import com.francisco.servly.model.dto.UserLoginDto;
import com.francisco.servly.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> getAll();
    Optional<User> getById(int id);
    User save(User user);
    void delete(int id);
    User getByToken(String token);
    User proveLogin(UserLoginDto user);
}
