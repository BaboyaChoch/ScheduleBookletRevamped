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
import com.bdi.courses.model.Course;
import com.bdi.courses.repository.CourseRepository;


@RestController
@RequestMapping("/courses")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    // get all courses
    @GetMapping
    public List<Course> getAllCourses() {
        return this.courseRepository.findAll();
    }

    // get course by id
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable (value = "id") long courseId) {
        return this.courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id :" + courseId));
    }

    // create course
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return this.courseRepository.save(course);
    }
    
    // update course
    @PutMapping("/{id}")
    public Course updateCourse(@RequestBody Course course, @PathVariable ("id") long courseId) {
         Course existingCourse = this.courseRepository.findById(courseId)
            .orElseThrow(() -> new ResourceNotFoundException("Course not found with id :" + courseId));
         existingCourse.setAvailability(course.getAvailability());
         existingCourse.setBuilding(course.getBuilding());
         existingCourse.setCoursenum(course.getCoursenum());
         existingCourse.setCredits(course.getCredits());
         existingCourse.setDays(course.getDays());
         existingCourse.setDescription(course.getDescription());
         existingCourse.setEnrollment(course.getEnrollment());
         existingCourse.setInstructor(course.getInstructor());
         existingCourse.setKeey(course.getKeey());
         existingCourse.setLabhash(course.getLabhash());
         existingCourse.setMoreinfo(course.getMoreinfo());
         existingCourse.setNotes(course.getNotes());
         existingCourse.setPrereqs(course.getPrereqs());
         existingCourse.setSection(course.getSection());
         existingCourse.setSpecialenrollment(course.getSpecialenrollment());
         existingCourse.setTime(course.getTime());
         existingCourse.setType(course.getType());
         return this.courseRepository.save(existingCourse);
    }
    
    // delete course by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Course> deleteCourse(@PathVariable ("id") long courseId){
         Course existingCourse = this.courseRepository.findById(courseId)
                    .orElseThrow(() -> new ResourceNotFoundException("Course not found with id :" + courseId));
         this.courseRepository.delete(existingCourse);
         return ResponseEntity.ok().build();
    }
}