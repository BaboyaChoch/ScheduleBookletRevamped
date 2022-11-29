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
import com.bdi.courses.model.Fall_2022_CSC_Labs;
import com.bdi.courses.repository.Fall_2022_CSC_Labs_Repository;

@RestController
@RequestMapping("/Fall_2022_CSC_Labs")
public class Fall_2022_CSC_Labs_Controller {

    @Autowired
    private Fall_2022_CSC_Labs_Repository fall_2022_CSC_LabsRepository;

    // get all fall_2022_CSC_Labss
    @GetMapping("/getAll")
    public List<Fall_2022_CSC_Labs> getAllFall_2022_CSC_Labss() {
        return this.fall_2022_CSC_LabsRepository.findAll();
    }

    // get fall_2022_CSC_Labs by id
    @GetMapping("/{id}")
    public Fall_2022_CSC_Labs getFall_2022_CSC_LabsById(@PathVariable(value = "id") long fall_2022_CSC_LabsId) {
        return this.fall_2022_CSC_LabsRepository.findById(fall_2022_CSC_LabsId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Fall_2022_CSC_Labs not found with id :" + fall_2022_CSC_LabsId));
    }

    // create fall_2022_CSC_Labs
    @PostMapping
    public Fall_2022_CSC_Labs createFall_2022_CSC_Labs(@RequestBody Fall_2022_CSC_Labs fall_2022_CSC_Labs) {
        return this.fall_2022_CSC_LabsRepository.save(fall_2022_CSC_Labs);
    }

    // update fall_2022_CSC_Labs
    @PutMapping("/{id}")
    public Fall_2022_CSC_Labs updateFall_2022_CSC_Labs(@RequestBody Fall_2022_CSC_Labs fall_2022_CSC_Labs,
            @PathVariable("id") long fall_2022_CSC_LabsId) {
        Fall_2022_CSC_Labs existingFall_2022_CSC_Labs = this.fall_2022_CSC_LabsRepository.findById(fall_2022_CSC_LabsId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Fall_2022_CSC_Labs not found with id :" + fall_2022_CSC_LabsId));
        existingFall_2022_CSC_Labs.setLabdays(fall_2022_CSC_Labs.getLabdays());
        existingFall_2022_CSC_Labs.setLabinstructor(fall_2022_CSC_Labs.getLabinstructor());
        existingFall_2022_CSC_Labs.setLabtime(fall_2022_CSC_Labs.getLabtime());
        existingFall_2022_CSC_Labs.setType(fall_2022_CSC_Labs.getType());
        return this.fall_2022_CSC_LabsRepository.save(existingFall_2022_CSC_Labs);
    }

    // delete fall_2022_CSC_Labs by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Fall_2022_CSC_Labs> deleteFall_2022_CSC_Labs(@PathVariable("id") long fall_2022_CSC_LabsId) {
        Fall_2022_CSC_Labs existingFall_2022_CSC_Labs = this.fall_2022_CSC_LabsRepository.findById(fall_2022_CSC_LabsId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Fall_2022_CSC_Labs not found with id :" + fall_2022_CSC_LabsId));
        this.fall_2022_CSC_LabsRepository.delete(existingFall_2022_CSC_Labs);
        return ResponseEntity.ok().build();
    }
}