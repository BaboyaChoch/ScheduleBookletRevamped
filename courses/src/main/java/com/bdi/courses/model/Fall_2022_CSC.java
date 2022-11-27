package com.bdi.courses.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Fall_2022_CSC")
public class Fall_2022_CSC {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String availability;
    private String enrollment;
    private String coursenum;
    private String coursename;
    private String type;
    private String section;
    private String credits;
    private String time;
    private String days;
    private String building;
    private String instructor;
    private String moreinfo;
    private String specialenrollment;
    private String keey;
    @OneToOne
    private Fall_2022_CSC_Labs lab;
    private String prereqs;
    private String notes;
    private String description;

    public Fall_2022_CSC() {

    }

    public Fall_2022_CSC(String availability, String enrollment, String coursenum, String coursename, String type,
            String section,
            String credits, String time, String days, String building, String instructor, String moreinfo,
            String specialenrollment, String keey, String prereqs, String notes, String description) {
        super();
        this.availability = availability;
        this.enrollment = enrollment;
        this.coursenum = coursenum;
        this.coursename = coursename;
        this.type = type;
        this.section = section;
        this.credits = credits;
        this.time = time;
        this.days = days;
        this.building = building;
        this.instructor = instructor;
        this.moreinfo = moreinfo;
        this.specialenrollment = specialenrollment;
        this.keey = keey;
        this.prereqs = prereqs;
        this.notes = notes;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(String enrollment) {
        this.enrollment = enrollment;
    }

    public String getCoursenum() {
        return coursenum;
    }

    public void setCoursenum(String coursenum) {
        this.coursenum = coursenum;
    }

    public String getCoursename() {
        return coursename;
    }

    public void setCoursename(String coursename) {
        this.coursename = coursename;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getCredits() {
        return credits;
    }

    public void setCredits(String credits) {
        this.credits = credits;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDays() {
        return days;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public String getMoreinfo() {
        return moreinfo;
    }

    public void setMoreinfo(String moreinfo) {
        this.moreinfo = moreinfo;
    }

    public String getSpecialenrollment() {
        return specialenrollment;
    }

    public void setSpecialenrollment(String specialenrollment) {
        this.specialenrollment = specialenrollment;
    }

    public String getKeey() {
        return keey;
    }

    public void setKeey(String keey) {
        this.keey = keey;
    }

    public Fall_2022_CSC_Labs isLab() {
        return lab;
    }

    public void setLab(Fall_2022_CSC_Labs lab) {
        this.lab = lab;
    }

    public String getPrereqs() {
        return prereqs;
    }

    public void setPrereqs(String prereqs) {
        this.prereqs = prereqs;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}