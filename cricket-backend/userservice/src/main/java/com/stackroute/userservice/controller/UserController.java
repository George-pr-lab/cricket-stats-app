package com.stackroute.userservice.controller;

import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/auth")
public class UserController {

ResponseEntity<?> response;

@Autowired
UserService userService;

@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody User user){
    try{
        System.out.println(user.getUserId());
        userService.saveUser(user);
        return new ResponseEntity<String>("Created", HttpStatus.CREATED);
    }catch (UserAlreadyExistsException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

}
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user, HttpSession session){
    try {
        Map<String, String> map = new HashMap<String, String>();
        userService.findByUserIdAndPassword(user.getUserId(), user.getUserPassword());
        map.put("token", getToken(user.getUserId(),user.getUserPassword()));
        map.put("userId",user.getUserId());
        session.setAttribute("userId",user.getUserId());
//        String token = getToken(user.getUserId(),user.getUserPassword());
        session.setAttribute("password", user.getUserPassword());
//        JSON.stringify({"token":token,"userId":user.setUserId()});

        return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);


    }catch (UserNotFoundException e){
        return  new ResponseEntity<>(e.getMessage(),HttpStatus.UNAUTHORIZED);
    }catch (Exception e){
        return  new ResponseEntity<>(e.getMessage(),HttpStatus.UNAUTHORIZED);
    }
}

    private String getToken(String userId, String userPassword) {
        return Jwts.builder().setId(userId).setSubject(userPassword).setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "secretKey").compact();
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
        String password = (String) session.getAttribute("password");
        if(password!=null){
            session.invalidate();
            return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Please Login", HttpStatus.BAD_REQUEST);
        }
    }
}
