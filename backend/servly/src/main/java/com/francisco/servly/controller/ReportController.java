package com.francisco.servly.controller;

import com.francisco.servly.model.entity.Report;
import com.francisco.servly.services.interfaces.IReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private IReportService reportService;

    @GetMapping
    public List<Report> getAll() {
        return reportService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Report> getById(@PathVariable int id) {
        return reportService.getById(id);
    }

    @PostMapping
    public Report save(@RequestBody Report report) {
        return reportService.save(report);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        reportService.delete(id);
    }
}