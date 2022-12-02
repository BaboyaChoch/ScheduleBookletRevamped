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
import org.springframework.web.bind.annotation.CrossOrigin;

import com.bdi.courses.exception.ResourceNotFoundException;
import com.bdi.courses.model.Fall_2022_CSC;
import com.bdi.courses.repository.Fall_2022_CSC_Repository;

@RestController
@RequestMapping("/Fall_2022_CSC")
@CrossOrigin
public class Fall_2022_CSC_Controller {

    @Autowired
    private Fall_2022_CSC_Repository fall_2022_CSCRepository;

    // get all fall_2022_CSCs
    @GetMapping("/getAll")
    public List<Fall_2022_CSC> getAllFall_2022_CSCs() {
        return this.fall_2022_CSCRepository.findAll();
    }

    // get fall_2022_CSC by id
    @GetMapping("/{id}")
    public Fall_2022_CSC getFall_2022_CSCById(@PathVariable(value = "id") long fall_2022_CSCId) {
        return this.fall_2022_CSCRepository.findById(fall_2022_CSCId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Fall_2022_CSC not found with id :" + fall_2022_CSCId));
    }

    // create fall_2022_CSC
    @PostMapping
    public Fall_2022_CSC createFall_2022_CSC(@RequestBody Fall_2022_CSC fall_2022_CSC) {
        return this.fall_2022_CSCRepository.save(fall_2022_CSC);
    }

    // update fall_2022_CSC
    @PutMapping("/{id}")
    public Fall_2022_CSC updateFall_2022_CSC(@RequestBody Fall_2022_CSC fall_2022_CSC,
            @PathVariable("id") long fall_2022_CSCId) {
        Fall_2022_CSC existingFall_2022_CSC = this.fall_2022_CSCRepository.findById(fall_2022_CSCId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Fall_2022_CSC not found with id :" + fall_2022_CSCId));
        existingFall_2022_CSC.setAvailability(fall_2022_CSC.getAvailability());
        existingFall_2022_CSC.setBuilding(fall_2022_CSC.getBuilding());
        existingFall_2022_CSC.setCoursenum(fall_2022_CSC.getCoursenum());
        existingFall_2022_CSC.setCredits(fall_2022_CSC.getCredits());
        existingFall_2022_CSC.setDays(fall_2022_CSC.getDays());
        existingFall_2022_CSC.setDescription(fall_2022_CSC.getDescription());
        existingFall_2022_CSC.setEnrollment(fall_2022_CSC.getEnrollment());
        existingFall_2022_CSC.setInstructor(fall_2022_CSC.getInstructor());
        existingFall_2022_CSC.setLab(fall_2022_CSC.getLab());
        existingFall_2022_CSC.setMoreinfo(fall_2022_CSC.getMoreinfo());
        existingFall_2022_CSC.setNotes(fall_2022_CSC.getNotes());
        existingFall_2022_CSC.setPrereqs(fall_2022_CSC.getPrereqs());
        existingFall_2022_CSC.setSection(fall_2022_CSC.getSection());
        existingFall_2022_CSC.setSpecialenrollment(fall_2022_CSC.getSpecialenrollment());
        existingFall_2022_CSC.setTime(fall_2022_CSC.getTime());
        existingFall_2022_CSC.setType(fall_2022_CSC.getType());
        return this.fall_2022_CSCRepository.save(existingFall_2022_CSC);
    }

    // delete fall_2022_CSC by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Fall_2022_CSC> deleteFall_2022_CSC(@PathVariable("id") long fall_2022_CSCId) {
        Fall_2022_CSC existingFall_2022_CSC = this.fall_2022_CSCRepository.findById(fall_2022_CSCId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Fall_2022_CSC not found with id :" + fall_2022_CSCId));
        this.fall_2022_CSCRepository.delete(existingFall_2022_CSC);
        return ResponseEntity.ok().build();
    }
}