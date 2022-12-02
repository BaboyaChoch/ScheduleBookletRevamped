package com.bdi.courses.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "Spring_2023_Art_History")
public class Spring_2023_Art_History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String availability;
    private int enrollment;
    private String coursenum;
    private String coursename;
    private String type;
    private int section;
    private String credits;
    private String time;
    private String days;
    private String building;
    private String instructor;
    private String moreinfo;
    private String specialenrollment;
    @OneToOne
    private Lab_Placeholder lab;
    private String prereqs;
    private String notes;
    private String description;

    public Spring_2023_Art_History() {

    }

    public Spring_2023_Art_History(String availability, int enrollment, String coursenum, String coursename, String type,
            int section,
            String credits, String time, String days, String building, String instructor, String moreinfo,
            String specialenrollment, Lab_Placeholder lab, String prereqs, String notes,
            String description) {
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
        this.lab = lab;
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

    public int getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(int enrollment) {
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

    public int getSection() {
        return section;
    }

    public void setSection(int section) {
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

    public Lab_Placeholder isLab() {
        return lab;
    }

    public Lab_Placeholder getLab() {
        return lab;
    }

    public void setLab(Lab_Placeholder lab) {
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