package com.movie.Moviebackend.controller;

import com.movie.Moviebackend.model.ExamSubmission;
import com.movie.Moviebackend.repository.ExamSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/exams")
public class ExamSubmissionController {

    @Autowired
    private ExamSubmissionRepository examSubmissionRepository;

    private String hashString(String input) {
        if (input == null) {
            return "null";
        }
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "Error generating hash";
        }
    }

    private void generateAndSetHashes(ExamSubmission submission) {
        submission.setUserEmailHash(hashString(submission.getUserEmail()));
        submission.setAnswersHash(hashString(submission.getAnswers()));
        submission.setExamDetailsHash(hashString(submission.getExamDetails()));
        submission.setResultHash(hashString(submission.getResult()));

        String combinedData = (submission.getUserEmail() != null ? submission.getUserEmail() : "") +
                               (submission.getAnswers() != null ? submission.getAnswers() : "") +
                               (submission.getExamDetails() != null ? submission.getExamDetails() : "") +
                               (submission.getResult() != null ? submission.getResult() : "") +
                               (submission.getSubmittedAt() != null ? submission.getSubmittedAt().toString() : "") +
                               (submission.getExamId() != null ? submission.getExamId().toString() : "");
        submission.setCombinedHash(hashString(combinedData));
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitExam(@RequestBody ExamSubmission examSubmission) {
        try {
            // Check if a submission with the same examId and userEmail already exists
            Optional<ExamSubmission> existingSubmission = examSubmissionRepository.findAll().stream()
                .filter(submission -> submission.getExamId().equals(examSubmission.getExamId()) &&
                                      submission.getUserEmail().equals(examSubmission.getUserEmail()))
                .findFirst();

            if (existingSubmission.isPresent()) {
                return ResponseEntity.status(400).body("Submission with this examId and userEmail already exists.");
            }

            examSubmission.setSubmittedAt(LocalDateTime.now());
            generateAndSetHashes(examSubmission);
            examSubmissionRepository.save(examSubmission);
            return ResponseEntity.ok("Submission successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Submission failed");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<ExamSubmission>> getAllSubmissions() {
        try {
            List<ExamSubmission> submissions = examSubmissionRepository.findAll();
            return ResponseEntity.ok(submissions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateExamResult(@PathVariable Long id, @RequestBody ExamResultUpdateRequest request) {
        try {
            Optional<ExamSubmission> optionalSubmission = examSubmissionRepository.findById(id);
            if (optionalSubmission.isPresent()) {
                ExamSubmission submission = optionalSubmission.get();
                submission.setResult(request.getResult());
                submission.setResultHash(hashString(request.getResult())); // Set result hash
                generateAndSetHashes(submission); // Regenerate hashes to include result hash
                examSubmissionRepository.save(submission);
                return ResponseEntity.ok("Result updated successfully");
            } else {
                return ResponseEntity.status(404).body("Submission not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update result");
        }
    }

    @GetMapping("/verify/{id}")
    public ResponseEntity<String> verifySubmission(@PathVariable Long id) {
        try {
            Optional<ExamSubmission> optionalSubmission = examSubmissionRepository.findById(id);
            if (optionalSubmission.isPresent()) {
                ExamSubmission submission = optionalSubmission.get();

                boolean isUserEmailValid = hashString(submission.getUserEmail()).equals(submission.getUserEmailHash());
                boolean isAnswersValid = hashString(submission.getAnswers()).equals(submission.getAnswersHash());
                boolean isExamDetailsValid = hashString(submission.getExamDetails()).equals(submission.getExamDetailsHash());
                boolean isResultValid = hashString(submission.getResult()).equals(submission.getResultHash());

                String combinedData = (submission.getUserEmail() != null ? submission.getUserEmail() : "") +
                                       (submission.getAnswers() != null ? submission.getAnswers() : "") +
                                       (submission.getExamDetails() != null ? submission.getExamDetails() : "") +
                                       (submission.getResult() != null ? submission.getResult() : "") +
                                       (submission.getSubmittedAt() != null ? submission.getSubmittedAt().toString() : "") +
                                       (submission.getExamId() != null ? submission.getExamId().toString() : "");
                boolean isCombinedDataValid = hashString(combinedData).equals(submission.getCombinedHash());

                if (isUserEmailValid && isAnswersValid && isExamDetailsValid && isResultValid && isCombinedDataValid) {
                    return ResponseEntity.ok("Data integrity verified.");
                } else {
                    return ResponseEntity.status(400).body("Data integrity check failed.");
                }
            } else {
                return ResponseEntity.status(404).body("Submission not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Verification failed");
        }
    }

    @GetMapping("/by-email")
    public ResponseEntity<List<ExamSubmission>> getSubmissionsByEmail(@RequestParam String email) {
        try {
            List<ExamSubmission> submissions = examSubmissionRepository.findByUserEmail(email);
            if (submissions.isEmpty()) {
                return ResponseEntity.status(404).body(null);
            }
            return ResponseEntity.ok(submissions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
