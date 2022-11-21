package com.bdi.courses.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bdi.courses.exception.ResourceNotFoundException;
import com.bdi.courses.model.Spring_2023_CSC;
import com.bdi.courses.repository.Spring_2023_CSC_Repository;




@RestController
@RequestMapping("/Spring_2023_CSC")
@CrossOrigin
public class Spring_2023_CSC_Controller {

    @Autowired
    private Spring_2023_CSC_Repository spring_2023_CSCRepository;

    // get all spring_2023_CSCs
    @GetMapping
    public List<Spring_2023_CSC> getAllSpring_2023_CSCs() {
        return this.spring_2023_CSCRepository.findAll();
    }

    // get spring_2023_CSC by id
    @GetMapping("/{id}")
    public Spring_2023_CSC getSpring_2023_CSCById(@PathVariable (value = "id") long spring_2023_CSCId) {
        return this.spring_2023_CSCRepository.findById(spring_2023_CSCId)
                .orElseThrow(() -> new ResourceNotFoundException("Spring_2023_CSC not found with id :" + spring_2023_CSCId));
    }

    // create spring_2023_CSC
    @PostMapping
    public Spring_2023_CSC createSpring_2023_CSC(@RequestBody Spring_2023_CSC spring_2023_CSC) {
        return this.spring_2023_CSCRepository.save(spring_2023_CSC);
    }
    
    // update spring_2023_CSC
    @PutMapping("/{id}")
    public Spring_2023_CSC updateSpring_2023_CSC(@RequestBody Spring_2023_CSC spring_2023_CSC, @PathVariable ("id") long spring_2023_CSCId) {
         Spring_2023_CSC existingSpring_2023_CSC = this.spring_2023_CSCRepository.findById(spring_2023_CSCId)
            .orElseThrow(() -> new ResourceNotFoundException("Spring_2023_CSC not found with id :" + spring_2023_CSCId));
         existingSpring_2023_CSC.setAvailability(spring_2023_CSC.getAvailability());
         existingSpring_2023_CSC.setBuilding(spring_2023_CSC.getBuilding());
         existingSpring_2023_CSC.setCoursenum(spring_2023_CSC.getCoursenum());
         existingSpring_2023_CSC.setCredits(spring_2023_CSC.getCredits());
         existingSpring_2023_CSC.setDays(spring_2023_CSC.getDays());
         existingSpring_2023_CSC.setDescription(spring_2023_CSC.getDescription());
         existingSpring_2023_CSC.setEnrollment(spring_2023_CSC.getEnrollment());
         existingSpring_2023_CSC.setInstructor(spring_2023_CSC.getInstructor());
         existingSpring_2023_CSC.setKeey(spring_2023_CSC.getKeey());
         existingSpring_2023_CSC.setLabhash(spring_2023_CSC.getLabhash());
         existingSpring_2023_CSC.setMoreinfo(spring_2023_CSC.getMoreinfo());
         existingSpring_2023_CSC.setNotes(spring_2023_CSC.getNotes());
         existingSpring_2023_CSC.setPrereqs(spring_2023_CSC.getPrereqs());
         existingSpring_2023_CSC.setSection(spring_2023_CSC.getSection());
         existingSpring_2023_CSC.setSpecialenrollment(spring_2023_CSC.getSpecialenrollment());
         existingSpring_2023_CSC.setTime(spring_2023_CSC.getTime());
         existingSpring_2023_CSC.setType(spring_2023_CSC.getType());
         return this.spring_2023_CSCRepository.save(existingSpring_2023_CSC);
    }
    
    // delete spring_2023_CSC by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Spring_2023_CSC> deleteSpring_2023_CSC(@PathVariable ("id") long spring_2023_CSCId){
         Spring_2023_CSC existingSpring_2023_CSC = this.spring_2023_CSCRepository.findById(spring_2023_CSCId)
                    .orElseThrow(() -> new ResourceNotFoundException("Spring_2023_CSC not found with id :" + spring_2023_CSCId));
         this.spring_2023_CSCRepository.delete(existingSpring_2023_CSC);
         return ResponseEntity.ok().build();
    }
}