package com.bdi.courses.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Spring_2023_CSC_Labs")
public class Spring_2023_CSC_Labs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private String labtime;

    private String labdays;

    private String labinstructor;

    private int keey;

    public Spring_2023_CSC_Labs() {
    }

    public Spring_2023_CSC_Labs(String type, String labtime, String labdays, String labinstructor, int keey) {
        super();
        this.type = type;
        this.labtime = labtime;
        this.labdays = labdays;
        this.labinstructor = labinstructor;
        this.keey = keey;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLabtime() {
        return labtime;
    }

    public void setLabtime(String labtime) {
        this.labtime = labtime;
    }

    public String getLabdays() {
        return labdays;
    }

    public void setLabdays(String labdays) {
        this.labdays = labdays;
    }

    public String getLabinstructor() {
        return labinstructor;
    }

    public void setLabinstructor(String labinstructor) {
        this.labinstructor = labinstructor;
    }

    public int getKeey() {
        return keey;
    }

    public void setKeey(int keey) {
        this.keey = keey;
    }
}
