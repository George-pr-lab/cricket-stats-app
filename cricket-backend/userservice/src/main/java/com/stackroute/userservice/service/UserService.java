package com.stackroute.userservice.service;

import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotExistsException;

import java.util.List;

public interface UserService {

    public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException;

    boolean saveUser(User user) throws UserAlreadyExistsException;
//    public User addUser(User user) throws UserAlreadyExistsException;;
    public User getUser(String userId) throws UserNotExistsException;;
    public List<User> getAllUser();
    public User updateUser(User user) throws UserNotExistsException;
    public void deleteUser(String userId) throws UserNotExistsException;
}
