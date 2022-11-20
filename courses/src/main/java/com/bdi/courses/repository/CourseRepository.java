package com.bdi.courses.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bdi.courses.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

}
