package com.bdi.courses.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bdi.courses.exception.ResourceNotFoundException;
import com.bdi.courses.model.Spring_2023_CSC_Labs;
import com.bdi.courses.repository.Spring_2023_CSC_Labs_Repository;

@RestController
@RequestMapping("/Spring_2023_CSC_Labs")
public class Spring_2023_CSC_Labs_Controller {

    @Autowired
    private Spring_2023_CSC_Labs_Repository spring_2023_CSC_LabsRepository;

    // get all spring_2023_CSC_Labss
    @GetMapping("/getAll")
    public List<Spring_2023_CSC_Labs> getAllSpring_2023_CSC_Labss() {
        return this.spring_2023_CSC_LabsRepository.findAll();
    }

    // get spring_2023_CSC_Labs by id
    @GetMapping("/{id}")
    public Spring_2023_CSC_Labs getSpring_2023_CSC_LabsById(@PathVariable(value = "id") long spring_2023_CSC_LabsId) {
        return this.spring_2023_CSC_LabsRepository.findById(spring_2023_CSC_LabsId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Spring_2023_CSC_Labs not found with id :" + spring_2023_CSC_LabsId));
    }

    // create spring_2023_CSC_Labs
    @PostMapping
    public Spring_2023_CSC_Labs createSpring_2023_CSC_Labs(@RequestBody Spring_2023_CSC_Labs spring_2023_CSC_Labs) {
        return this.spring_2023_CSC_LabsRepository.save(spring_2023_CSC_Labs);
    }

    // update spring_2023_CSC_Labs
    @PutMapping("/{id}")
    public Spring_2023_CSC_Labs updateSpring_2023_CSC_Labs(@RequestBody Spring_2023_CSC_Labs spring_2023_CSC_Labs,
            @PathVariable("id") long spring_2023_CSC_LabsId) {
        Spring_2023_CSC_Labs existingSpring_2023_CSC_Labs = this.spring_2023_CSC_LabsRepository
                .findById(spring_2023_CSC_LabsId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Spring_2023_CSC_Labs not found with id :" + spring_2023_CSC_LabsId));
        existingSpring_2023_CSC_Labs.setLabdays(spring_2023_CSC_Labs.getLabdays());
        existingSpring_2023_CSC_Labs.setLabinstructor(spring_2023_CSC_Labs.getLabinstructor());
        existingSpring_2023_CSC_Labs.setLabtime(spring_2023_CSC_Labs.getLabtime());
        existingSpring_2023_CSC_Labs.setType(spring_2023_CSC_Labs.getType());
        return this.spring_2023_CSC_LabsRepository.save(existingSpring_2023_CSC_Labs);
    }

    // delete spring_2023_CSC_Labs by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Spring_2023_CSC_Labs> deleteSpring_2023_CSC_Labs(
            @PathVariable("id") long spring_2023_CSC_LabsId) {
        Spring_2023_CSC_Labs existingSpring_2023_CSC_Labs = this.spring_2023_CSC_LabsRepository
                .findById(spring_2023_CSC_LabsId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Spring_2023_CSC_Labs not found with id :" + spring_2023_CSC_LabsId));
        this.spring_2023_CSC_LabsRepository.delete(existingSpring_2023_CSC_Labs);
        return ResponseEntity.ok().build();
    }
}