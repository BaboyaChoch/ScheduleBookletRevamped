package com.bdi.courses.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bdi.courses.model.Lab;

@Repository
public interface LabRepository extends JpaRepository<Lab, Long> {

}
