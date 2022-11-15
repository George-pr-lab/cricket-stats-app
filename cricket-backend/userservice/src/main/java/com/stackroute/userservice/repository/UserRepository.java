package com.stackroute.userservice.repository;

import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUserIdAndUserPassword(String userId, String userPassword) throws UserNotFoundException;
//    boolean saveUser(User user) throws UserAlreadyExistsException;
}
