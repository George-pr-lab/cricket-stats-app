package com.stackroute.userservice.model;

import javax.persistence.*;

import java.time.LocalDateTime;
//import java.util.LocalDateTime;

@Entity
@Table(name="user")
public class User {
    @Id
    private String userId;
    private String firstName;
    private String lastName;
    private String userPassword;
    private String userRole;
    private LocalDateTime userAddedDate;

    public User() {
    }

    public User(String userId, String firstName, String lastName, String userPassword, String userRole, LocalDateTime userAddedDate) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userPassword = userPassword;
        this.userRole = userRole;
        this.userAddedDate = userAddedDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public LocalDateTime getUserAddedDate() {
        return userAddedDate;
    }

    public void setUserAddedDate(LocalDateTime userAddedDate) {
        this.userAddedDate = userAddedDate;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userRole='" + userRole + '\'' +
                ", userAddedDate=" + userAddedDate +
                '}';
    }
}
