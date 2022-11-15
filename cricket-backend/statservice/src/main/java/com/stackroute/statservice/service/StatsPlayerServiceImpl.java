package com.stackroute.statservice.service;

import com.stackroute.statservice.model.StatsPlayer;
import com.stackroute.statservice.repository.StatsPlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StatsPlayerServiceImpl implements StatsPlayerService{

    @Autowired
    StatsPlayerRepository statsPlayerRepository;
    @Override
    public List<StatsPlayer> saveALLPlayers(List<StatsPlayer> statsPlayers) {
        return statsPlayerRepository.saveAllAndFlush(statsPlayers);

    }

    @Override
    public List<StatsPlayer> getAllStatPlayers() {
        return statsPlayerRepository.findAll();
    }
}
