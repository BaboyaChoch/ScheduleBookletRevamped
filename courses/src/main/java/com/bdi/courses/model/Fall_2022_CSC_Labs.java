package com.bdi.courses.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Fall_2022_CSC_Labs")
public class Fall_2022_CSC_Labs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private String labtime;

    private String labdays;

    private String labinstructor;

    public Fall_2022_CSC_Labs() {
    }

    public Fall_2022_CSC_Labs(String type, String labtime, String labdays, String labinstructor) {
        super();
        this.type = type;
        this.labtime = labtime;
        this.labdays = labdays;
        this.labinstructor = labinstructor;
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

}
