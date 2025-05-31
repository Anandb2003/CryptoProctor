package com.movie.Moviebackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "exam_submissions")
public class ExamSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String answers;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String examDetails;

    @Column(nullable = false)
    private LocalDateTime submittedAt;

    @Lob
    @Column
    private String result;

    @Column
    private String userEmailHash;

    @Column
    private String answersHash;

    @Column
    private String examDetailsHash;

    @Column
    private String resultHash;

    @Column
    private String combinedHash;
    
    @Column(nullable = false)
    private Long examId;

    // Getter and Setter
    public Long getExamId() { return examId; }
    public void setExamId(Long examId) { this.examId = examId; }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public String getAnswers() { return answers; }
    public void setAnswers(String answers) { this.answers = answers; }
    public String getExamDetails() { return examDetails; }
    public void setExamDetails(String examDetails) { this.examDetails = examDetails; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }
    public String getUserEmailHash() { return userEmailHash; }
    public void setUserEmailHash(String userEmailHash) { this.userEmailHash = userEmailHash; }
    public String getAnswersHash() { return answersHash; }
    public void setAnswersHash(String answersHash) { this.answersHash = answersHash; }
    public String getExamDetailsHash() { return examDetailsHash; }
    public void setExamDetailsHash(String examDetailsHash) { this.examDetailsHash = examDetailsHash; }
    public String getResultHash() { return resultHash; }
    public void setResultHash(String resultHash) { this.resultHash = resultHash; }
    public String getCombinedHash() { return combinedHash; }
    public void setCombinedHash(String combinedHash) { this.combinedHash = combinedHash; }

    public ExamSubmission(Long id, String userEmail, String answers, String examDetails, LocalDateTime submittedAt, String result,
                          String userEmailHash, String answersHash, String examDetailsHash, String resultHash, String combinedHash) {
        this.id = id;
        this.userEmail = userEmail;
        this.answers = answers;
        this.examDetails = examDetails;
        this.submittedAt = submittedAt;
        this.result = result;
        this.userEmailHash = userEmailHash;
        this.answersHash = answersHash;
        this.examDetailsHash = examDetailsHash;
        this.resultHash = resultHash;
        this.combinedHash = combinedHash;
    }

    public ExamSubmission() {
    }
}
