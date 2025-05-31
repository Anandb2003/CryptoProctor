package com.movie.Moviebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie.Moviebackend.model.ExamDetails;

public interface ExamDetailsRepository extends JpaRepository<ExamDetails, Long> {
}
