package com.stackroute.favouriteservice.model;

import org.hibernate.annotations.Columns;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

@Entity
public class Favourite {
    @Id
    @Column(name="id")
    private String id;
    private String name;
    private String country;
    private String favouriteCreatedBy;

    private LocalDateTime favouriteCreationDate;

    public Favourite() {
    }

    public Favourite(String id, String name, String country, String favouriteCreatedBy, LocalDateTime favouriteCreationDate) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.favouriteCreatedBy = favouriteCreatedBy;
        this.favouriteCreationDate = favouriteCreationDate;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getFavouriteCreatedBy() {
        return favouriteCreatedBy;
    }

    public void setFavouriteCreatedBy(String favouriteCreatedBy) {
        this.favouriteCreatedBy = favouriteCreatedBy;
    }

    public LocalDateTime getFavouriteCreationDate() {
        return favouriteCreationDate;
    }

    public void setFavouriteCreationDate(LocalDateTime favouriteCreationDate) {
        this.favouriteCreationDate = favouriteCreationDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Favourite)) return false;
        Favourite favourite = (Favourite) o;
        return getId().equals(favourite.getId()) && Objects.equals(getName(), favourite.getName()) && Objects.equals(getCountry(), favourite.getCountry()) && getFavouriteCreatedBy().equals(favourite.getFavouriteCreatedBy()) && Objects.equals(getFavouriteCreationDate(), favourite.getFavouriteCreationDate());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getCountry(), getFavouriteCreatedBy(), getFavouriteCreationDate());
    }

    @Override
    public String toString() {
        return "Favourite{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", country='" + country + '\'' +
                ", favouriteCreatedBy='" + favouriteCreatedBy + '\'' +
                ", favouriteCreationDate=" + favouriteCreationDate +
                '}';
    }
    /*
    public Favourite(String favId, String name, String country, String favouriteCreatedBy, LocalDateTime favouriteCreationDate) {
        this.favId = favId;
        this.name = name;
        this.country = country;
        this.favouriteCreatedBy = favouriteCreatedBy;
        this.favouriteCreationDate = favouriteCreationDate;
    }

    public String getFavId() {
        return favId;
    }

    public void setFavId(String favId) {
        this.favId = favId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getFavouriteCreatedBy() {
        return favouriteCreatedBy;
    }

    public void setFavouriteCreatedBy(String favouriteCreatedBy) {
        this.favouriteCreatedBy = favouriteCreatedBy;
    }

    public LocalDateTime getFavouriteCreationDate() {
        return favouriteCreationDate;
    }

    public void setFavouriteCreationDate(LocalDateTime favouriteCreationDate) {
        this.favouriteCreationDate = favouriteCreationDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Favourite)) return false;
        Favourite favourite = (Favourite) o;
        return getFavId().equals(favourite.getFavId()) && Objects.equals(getName(), favourite.getName()) && Objects.equals(getCountry(), favourite.getCountry()) && getFavouriteCreatedBy().equals(favourite.getFavouriteCreatedBy()) && getFavouriteCreationDate().equals(favourite.getFavouriteCreationDate());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getFavId(), getName(), getCountry(), getFavouriteCreatedBy(), getFavouriteCreationDate());
    }

    @Override
    public String toString() {
        return "Favourite{" +
                "favId=" + favId +
                ", name='" + name + '\'' +
                ", country='" + country + '\'' +
                ", favouriteCreatedBy='" + favouriteCreatedBy + '\'' +
                ", favouriteCreationDate=" + favouriteCreationDate +
                '}';
    }*/
}
