package com.francisco.servly.repository;

import com.francisco.servly.model.entity.Server;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServerRepository extends JpaRepository<Server, Integer> {
    Optional<Server> findByAddress(String address);

    List<Server> findByType(String type);
}
