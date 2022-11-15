package com.stackroute.userservice.service;

import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;


    @Override
    public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {
        User user=userRepository.findByUserIdAndUserPassword(userId, password);
        if(user ==null) {
            throw new UserNotFoundException("User is not found");
        }
        return user;
    }

    @Override
    public boolean saveUser(User user) throws UserAlreadyExistsException {
        Optional<User> optional=userRepository.findById(user.getUserId());
        if(optional.isPresent()){
            throw new UserAlreadyExistsException("user already exist");
        }
        userRepository.save(user);
        return Boolean.TRUE;
    }

//    @Override
//    public User addUser(User user) throws UserAlreadyExistsException {
//        try{
//            return userRepository.save(user);
//        }catch (Exception e){
//            throw new UserAlreadyExistsException("user already exist");
//        }
////        return null;
//    }

    @Override
    public User getUser(String userId) throws UserNotExistsException {
        try {
            User user = userRepository.getById(userId);
            if(user!=null)
            return user;
        }catch (Exception e){
            throw new UserNotExistsException();
        }
        return null;
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user) throws UserNotExistsException {
        try{
            if(user== null) throw new UserNotExistsException();
            return userRepository.saveAndFlush(user);
        }catch (Exception e){
            throw new UserNotExistsException();
        }
//        return null;
    }

    @Override
    public void deleteUser(String userId) throws UserNotExistsException {
            User user =userRepository.findById(userId)
                    .orElseThrow(()-> new UserNotExistsException());

            userRepository.deleteById(userId);
    }


}
