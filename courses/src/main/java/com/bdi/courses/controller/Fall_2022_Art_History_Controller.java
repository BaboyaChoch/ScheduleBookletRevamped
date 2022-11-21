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
import com.bdi.courses.model.Fall_2022_Art_History;
import com.bdi.courses.repository.Fall_2022_Art_History_Repository;




@RestController
@RequestMapping("/Fall_2022_Art_History")
@CrossOrigin
public class Fall_2022_Art_History_Controller {

    @Autowired
    private Fall_2022_Art_History_Repository fall_2022_Art_HistoryRepository;

    // get all fall_2022_Art_Historys
    @GetMapping
    public List<Fall_2022_Art_History> getAllFall_2022_Art_Historys() {
        return this.fall_2022_Art_HistoryRepository.findAll();
    }

    // get fall_2022_Art_History by id
    @GetMapping("/{id}")
    public Fall_2022_Art_History getFall_2022_Art_HistoryById(@PathVariable (value = "id") long fall_2022_Art_HistoryId) {
        return this.fall_2022_Art_HistoryRepository.findById(fall_2022_Art_HistoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Fall_2022_Art_History not found with id :" + fall_2022_Art_HistoryId));
    }

    // create fall_2022_Art_History
    @PostMapping
    public Fall_2022_Art_History createFall_2022_Art_History(@RequestBody Fall_2022_Art_History fall_2022_Art_History) {
        return this.fall_2022_Art_HistoryRepository.save(fall_2022_Art_History);
    }
    
    // update fall_2022_Art_History
    @PutMapping("/{id}")
    public Fall_2022_Art_History updateFall_2022_Art_History(@RequestBody Fall_2022_Art_History fall_2022_Art_History, @PathVariable ("id") long fall_2022_Art_HistoryId) {
         Fall_2022_Art_History existingFall_2022_Art_History = this.fall_2022_Art_HistoryRepository.findById(fall_2022_Art_HistoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Fall_2022_Art_History not found with id :" + fall_2022_Art_HistoryId));
         existingFall_2022_Art_History.setAvailability(fall_2022_Art_History.getAvailability());
         existingFall_2022_Art_History.setBuilding(fall_2022_Art_History.getBuilding());
         existingFall_2022_Art_History.setCoursenum(fall_2022_Art_History.getCoursenum());
         existingFall_2022_Art_History.setCredits(fall_2022_Art_History.getCredits());
         existingFall_2022_Art_History.setDays(fall_2022_Art_History.getDays());
         existingFall_2022_Art_History.setDescription(fall_2022_Art_History.getDescription());
         existingFall_2022_Art_History.setEnrollment(fall_2022_Art_History.getEnrollment());
         existingFall_2022_Art_History.setInstructor(fall_2022_Art_History.getInstructor());
         existingFall_2022_Art_History.setKeey(fall_2022_Art_History.getKeey());
         existingFall_2022_Art_History.setLabhash(fall_2022_Art_History.getLabhash());
         existingFall_2022_Art_History.setMoreinfo(fall_2022_Art_History.getMoreinfo());
         existingFall_2022_Art_History.setNotes(fall_2022_Art_History.getNotes());
         existingFall_2022_Art_History.setPrereqs(fall_2022_Art_History.getPrereqs());
         existingFall_2022_Art_History.setSection(fall_2022_Art_History.getSection());
         existingFall_2022_Art_History.setSpecialenrollment(fall_2022_Art_History.getSpecialenrollment());
         existingFall_2022_Art_History.setTime(fall_2022_Art_History.getTime());
         existingFall_2022_Art_History.setType(fall_2022_Art_History.getType());
         return this.fall_2022_Art_HistoryRepository.save(existingFall_2022_Art_History);
    }
    
    // delete fall_2022_Art_History by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Fall_2022_Art_History> deleteFall_2022_Art_History(@PathVariable ("id") long fall_2022_Art_HistoryId){
         Fall_2022_Art_History existingFall_2022_Art_History = this.fall_2022_Art_HistoryRepository.findById(fall_2022_Art_HistoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Fall_2022_Art_History not found with id :" + fall_2022_Art_HistoryId));
         this.fall_2022_Art_HistoryRepository.delete(existingFall_2022_Art_History);
         return ResponseEntity.ok().build();
    }
}