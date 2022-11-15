package com.stackroute.statservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class StatsPlayer {
    @Id
    @Column(name="id")
    private String id;
    private String name;

    public StatsPlayer() {
    }

    public StatsPlayer(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "StatPlayer{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
