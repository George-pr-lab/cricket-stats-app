package com.stackroute.favouriteservice.repository;

import com.stackroute.favouriteservice.model.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, String> {

    List<Favourite> findAllFavouriteByFavouriteCreatedBy(String favouriteCreatedBy);

}
