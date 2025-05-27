package com.francisco.servly.services.interfaces;

import com.francisco.servly.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> getAll();
    Optional<User> getById(int id);
    User save(User user);
    void delete(int id);
}
