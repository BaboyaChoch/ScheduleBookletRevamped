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
import com.bdi.courses.model.Spring_2023_Art_History;
import com.bdi.courses.repository.Spring_2023_Art_History_Repository;




@RestController
@RequestMapping("/Spring_2023_Art_History")
@CrossOrigin
public class Spring_2023_Art_History_Controller {

    @Autowired
    private Spring_2023_Art_History_Repository spring_2023_Art_HistoryRepository;

    // get all spring_2023_Art_Historys
    @GetMapping("/getAll")
    public List<Spring_2023_Art_History> getAllSpring_2023_Art_Historys() {
        return this.spring_2023_Art_HistoryRepository.findAll();
    }

    // get spring_2023_Art_History by id
    @GetMapping("/{id}")
    public Spring_2023_Art_History getSpring_2023_Art_HistoryById(@PathVariable (value = "id") long spring_2023_Art_HistoryId) {
        return this.spring_2023_Art_HistoryRepository.findById(spring_2023_Art_HistoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Spring_2023_Art_History not found with id :" + spring_2023_Art_HistoryId));
    }

    // create spring_2023_Art_History
    @PostMapping
    public Spring_2023_Art_History createSpring_2023_Art_History(@RequestBody Spring_2023_Art_History spring_2023_Art_History) {
        return this.spring_2023_Art_HistoryRepository.save(spring_2023_Art_History);
    }
    
    // update spring_2023_Art_History
    @PutMapping("/{id}")
    public Spring_2023_Art_History updateSpring_2023_Art_History(@RequestBody Spring_2023_Art_History spring_2023_Art_History, @PathVariable ("id") long spring_2023_Art_HistoryId) {
         Spring_2023_Art_History existingSpring_2023_Art_History = this.spring_2023_Art_HistoryRepository.findById(spring_2023_Art_HistoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Spring_2023_Art_History not found with id :" + spring_2023_Art_HistoryId));
         existingSpring_2023_Art_History.setAvailability(spring_2023_Art_History.getAvailability());
         existingSpring_2023_Art_History.setBuilding(spring_2023_Art_History.getBuilding());
         existingSpring_2023_Art_History.setCoursenum(spring_2023_Art_History.getCoursenum());
         existingSpring_2023_Art_History.setCredits(spring_2023_Art_History.getCredits());
         existingSpring_2023_Art_History.setDays(spring_2023_Art_History.getDays());
         existingSpring_2023_Art_History.setDescription(spring_2023_Art_History.getDescription());
         existingSpring_2023_Art_History.setEnrollment(spring_2023_Art_History.getEnrollment());
         existingSpring_2023_Art_History.setInstructor(spring_2023_Art_History.getInstructor());
         existingSpring_2023_Art_History.setMoreinfo(spring_2023_Art_History.getMoreinfo());
         existingSpring_2023_Art_History.setNotes(spring_2023_Art_History.getNotes());
         existingSpring_2023_Art_History.setPrereqs(spring_2023_Art_History.getPrereqs());
         existingSpring_2023_Art_History.setSection(spring_2023_Art_History.getSection());
         existingSpring_2023_Art_History.setSpecialenrollment(spring_2023_Art_History.getSpecialenrollment());
         existingSpring_2023_Art_History.setTime(spring_2023_Art_History.getTime());
         existingSpring_2023_Art_History.setType(spring_2023_Art_History.getType());
         return this.spring_2023_Art_HistoryRepository.save(existingSpring_2023_Art_History);
    }
    
    // delete spring_2023_Art_History by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Spring_2023_Art_History> deleteSpring_2023_Art_History(@PathVariable ("id") long spring_2023_Art_HistoryId){
         Spring_2023_Art_History existingSpring_2023_Art_History = this.spring_2023_Art_HistoryRepository.findById(spring_2023_Art_HistoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Spring_2023_Art_History not found with id :" + spring_2023_Art_HistoryId));
         this.spring_2023_Art_HistoryRepository.delete(existingSpring_2023_Art_History);
         return ResponseEntity.ok().build();
    }
}