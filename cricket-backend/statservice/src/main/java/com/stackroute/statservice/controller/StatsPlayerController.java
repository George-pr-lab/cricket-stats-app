package com.stackroute.statservice.controller;

import com.stackroute.statservice.model.StatsPlayer;
import com.stackroute.statservice.service.StatsPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class StatsPlayerController {
    ResponseEntity<?> response;
    @Autowired
    StatsPlayerService statsPlayerService;

    @PostMapping("/statsplayer")
    public ResponseEntity<?> createFavourite(@RequestBody List<StatsPlayer> statsPlayerList, HttpSession session){

        try{
            statsPlayerService.saveALLPlayers(statsPlayerList);
            return new ResponseEntity<>("Created", HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>("Conflict",HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/statsplayer")
    public ResponseEntity<?> getAllStatsPlayer(){
        List<StatsPlayer> statsPlayerList =  statsPlayerService.getAllStatPlayers();
        if(statsPlayerList!=null) {
            return new ResponseEntity<List<StatsPlayer>>(statsPlayerList,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Failure! No Records",HttpStatus.BAD_REQUEST);
        }
    }
}
