package com.francisco.servly.repository;

import com.francisco.servly.model.entity.Script;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScriptRepository extends JpaRepository<Script, Integer> {
    List<Script> findByServerId(int serverId);

    List<Script> findByTitleAndServerId(String title, int serverId);

    Script findByContentAndServer_Id(String content, int serverId);
}
