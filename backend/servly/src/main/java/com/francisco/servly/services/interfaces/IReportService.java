package com.francisco.servly.services.interfaces;

import com.francisco.servly.model.entity.Report;

import java.util.List;
import java.util.Optional;

public interface IReportService {
    List<Report> getAll();
    Optional<Report> getById(int id);
    Report save(Report report);
    void delete(int id);
}
