package com.movie.Moviebackend.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie.Moviebackend.model.ExamSubmission;

public interface ExamSubmissionRepository extends JpaRepository<ExamSubmission, Long>
{
	List<ExamSubmission> findByUserEmail(String userEmail);
}
