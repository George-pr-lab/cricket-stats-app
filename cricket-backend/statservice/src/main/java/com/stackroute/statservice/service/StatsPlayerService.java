package com.stackroute.statservice.service;

import com.stackroute.statservice.model.StatsPlayer;

import java.util.List;

public interface StatsPlayerService {
    public List<StatsPlayer> saveALLPlayers(List<StatsPlayer> statsPlayers);
    public List<StatsPlayer> getAllStatPlayers();
}
