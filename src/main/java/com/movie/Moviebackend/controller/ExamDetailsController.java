package com.movie.Moviebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.movie.Moviebackend.model.ExamDetails;
import com.movie.Moviebackend.repository.ExamDetailsRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/exams")
public class ExamDetailsController {

    @Autowired
    private ExamDetailsRepository examDetailsRepository;

    // Create a new exam
    @PostMapping
    public ResponseEntity<ExamDetails> createExamDetails(@RequestBody ExamDetails examDetails) {
        ExamDetails savedExamDetails = examDetailsRepository.save(examDetails);
        return ResponseEntity.ok(savedExamDetails);
    }

    // Get exam details by ID
    @GetMapping("/{id}")
    public ResponseEntity<ExamDetails> getExamDetails(@PathVariable Long id) {
        return examDetailsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all exam details
    @GetMapping
    public ResponseEntity<List<ExamDetails>> getAllExamDetails() {
        List<ExamDetails> examDetailsList = examDetailsRepository.findAll();
        return ResponseEntity.ok(examDetailsList);
    }

    // Delete exam details by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExamDetails(@PathVariable Long id) {
        if (examDetailsRepository.existsById(id)) {
            examDetailsRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    // Get the latest upcoming exam
    @GetMapping("/latest")
    public ResponseEntity<ExamDetails> getLatestUpcomingExam() {
        // Get the current time
        LocalDateTime now = LocalDateTime.now();
        
        // Find all exams
        List<ExamDetails> exams = examDetailsRepository.findAll();

        // Filter exams to find the latest upcoming one
        Optional<ExamDetails> latestExam = exams.stream()
                .filter(exam -> {
                    LocalDateTime examEndDateTime = LocalDateTime.of(exam.getStartDate(), exam.getEndTime());
                    return examEndDateTime.isAfter(now);
                })
                .min((e1, e2) -> LocalDateTime.of(e1.getStartDate(), e1.getStartTime())
                        .compareTo(LocalDateTime.of(e2.getStartDate(), e2.getStartTime())));

        // Return the latest upcoming exam, or 404 if none found
        return latestExam.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
