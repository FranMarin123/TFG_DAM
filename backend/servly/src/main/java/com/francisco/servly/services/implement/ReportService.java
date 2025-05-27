package com.francisco.servly.services.implement;

import com.francisco.servly.model.Report;
import com.francisco.servly.repository.ReportRepository;
import com.francisco.servly.services.interfaces.IReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService implements IReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Override
    public List<Report> getAll() {
        return reportRepository.findAll();
    }

    @Override
    public Optional<Report> getById(int id) {
        return reportRepository.findById(id);
    }

    @Override
    public Report save(Report report) {
        return reportRepository.save(report);
    }

    @Override
    public void delete(int id) {
        reportRepository.deleteById(id);
    }
}
