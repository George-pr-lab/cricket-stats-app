package com.stackroute.statservice.repository;

import com.stackroute.statservice.model.StatsPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatsPlayerRepository extends JpaRepository<StatsPlayer, String> {
}
