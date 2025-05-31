package com.movie.Moviebackend.model;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "exam_details")
public class ExamDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;
    private LocalTime startTime;
    private LocalTime endTime;
    
    @Column(name = "num_subjects")
    private int numSubjects;

    @Lob
    @Column(name = "subjects_and_questions", columnDefinition = "TEXT")
    private String subjectsAndQuestions;  // JSON or serialized data for subjects and questions

    // Getters and Setters

    public ExamDetails() {}

    public ExamDetails(Long id, LocalDate startDate, LocalTime startTime, LocalTime endTime, int numSubjects,
                       String subjectsAndQuestions) {
        this.id = id;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.numSubjects = numSubjects;
        this.subjectsAndQuestions = subjectsAndQuestions;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public int getNumSubjects() {
		return numSubjects;
	}

	public void setNumSubjects(int numSubjects) {
		this.numSubjects = numSubjects;
	}

	public String getSubjectsAndQuestions() {
		return subjectsAndQuestions;
	}

	public void setSubjectsAndQuestions(String subjectsAndQuestions) {
		this.subjectsAndQuestions = subjectsAndQuestions;
	}

    
    // Getters and Setters
}
