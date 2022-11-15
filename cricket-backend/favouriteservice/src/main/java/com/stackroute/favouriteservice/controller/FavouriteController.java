package com.stackroute.favouriteservice.controller;

import com.stackroute.favouriteservice.exception.FavouriteAlreadyExistsException;
import com.stackroute.favouriteservice.exception.FavouriteNotExistsException;
import com.stackroute.favouriteservice.model.Favourite;
import com.stackroute.favouriteservice.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.List;

@RestController
//@CrossOrigin("*")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class FavouriteController {
    ResponseEntity<?> response;
    @Autowired
    FavouriteService favouriteService;

    @PostMapping("/favourite")
    public ResponseEntity<?> createFavourite(@RequestBody Favourite favourite, HttpSession session){
        try{
            favourite.setFavouriteCreationDate(LocalDateTime.now());
//            favourite.setFavouriteCreatedBy(session.getAttribute("userId").toString());
            System.out.println("Favorite::"+favourite);
            favouriteService.createFavourite(favourite);
            return new ResponseEntity<>("Created", HttpStatus.CREATED);
        }catch (FavouriteAlreadyExistsException e){
            return new ResponseEntity<>("Conflict",HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/favourite/{userId}")
    public ResponseEntity<?> getAllFavouriteByUserId(@PathVariable String userId) {
        System.out.println("UserId::"+userId);
        List<Favourite> allFavourite = favouriteService.getAllFavouriteByUserId(userId);
        if (allFavourite != null) {
            return new ResponseEntity<List<Favourite>>(allFavourite, HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Error in loading the content", HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/favourite/{favId}")
    public ResponseEntity<?> deleteFavourite(@PathVariable String favId) {
        try {
            favouriteService.deleteFavourite(favId);
            return new ResponseEntity<String>("Favourite deleted", HttpStatus.OK);
        } catch (FavouriteNotExistsException e) {
            return new ResponseEntity<String>("Favourite Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/favourite/{favId}")
    public ResponseEntity<?> updateFavourite(@RequestBody Favourite favourite, @PathVariable String favId) {
        Favourite favourite1 = favouriteService.updateFavourite(favourite, favId);
        if (favourite1 == null) {
            return new ResponseEntity<String>(favourite.getName() + ": not found", HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<Favourite>(favourite1, HttpStatus.OK);
        }
    }

    @GetMapping("/favourite")
    public ResponseEntity<?> getAllFavorite(){
        List<Favourite> favList =  favouriteService.getAllFavourite();
        if(favList!=null) {
            return new ResponseEntity<List<Favourite>>(favList,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Failure! No Records",HttpStatus.BAD_REQUEST);
        }
    }

}
