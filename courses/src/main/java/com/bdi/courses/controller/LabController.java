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
import com.bdi.courses.model.Lab;
import com.bdi.courses.repository.LabRepository;


@RestController
@RequestMapping("/labs")
public class LabController {

    
    @Autowired
    private LabRepository labRepository;

    // get all labs
    @GetMapping
    public List<Lab> getAllLabs() {
        return this.labRepository.findAll();
    }

    // get lab by id
    @GetMapping("/{id}")
    public Lab getLabById(@PathVariable (value = "id") long labId) {
        return this.labRepository.findById(labId)
                .orElseThrow(() -> new ResourceNotFoundException("Lab not found with id :" + labId));
    }

    // create lab
    @PostMapping
    public Lab createLab(@RequestBody Lab lab) {
        return this.labRepository.save(lab);
    }
    
    // update lab
    @PutMapping("/{id}")
    public Lab updateLab(@RequestBody Lab lab, @PathVariable ("id") long labId) {
         Lab existingLab = this.labRepository.findById(labId)
            .orElseThrow(() -> new ResourceNotFoundException("Lab not found with id :" + labId));
         existingLab.setKeey(lab.getKeey());
         existingLab.setLabdays(lab.getLabdays());
         existingLab.setLabinstructor(lab.getLabinstructor());
         existingLab.setLabtime(lab.getLabtime());
         existingLab.setType(lab.getType());
         return this.labRepository.save(existingLab);
    }
    
    // delete lab by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Lab> deleteLab(@PathVariable ("id") long labId){
         Lab existingLab = this.labRepository.findById(labId)
                    .orElseThrow(() -> new ResourceNotFoundException("Lab not found with id :" + labId));
         this.labRepository.delete(existingLab);
         return ResponseEntity.ok().build();
    }
}