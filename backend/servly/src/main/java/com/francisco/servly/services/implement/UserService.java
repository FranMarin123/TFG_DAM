package com.francisco.servly.services.implement;

import com.francisco.servly.model.dto.UserLoginDto;
import com.francisco.servly.model.entity.User;
import com.francisco.servly.repository.UserRepository;
import com.francisco.servly.services.interfaces.IUserService;
import com.francisco.servly.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JWTUtils jwtUtils;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return null;
        }
        return userRepository.save(user);
    }

    @Override
    public void delete(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getByToken(String token) {
        if (token == null || token.isEmpty()) {
            return null;
        }
        String email=jwtUtils.extractUsername(token);
        return userRepository.findByEmail(email);
    }

    @Override
    public User proveLogin(UserLoginDto user) {
        if (user == null || user.getEmail() == null || user.getPassword() == null) {
            return null;
        }
        return userRepository.findByEmail(user.getEmail());
    }
}
