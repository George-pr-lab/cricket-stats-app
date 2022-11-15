package com.stackroute.favouriteservice.service;

import com.stackroute.favouriteservice.exception.FavouriteAlreadyExistsException;
import com.stackroute.favouriteservice.exception.FavouriteNotExistsException;
import com.stackroute.favouriteservice.model.Favourite;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FavouriteService {
    public Favourite createFavourite(Favourite user) throws FavouriteAlreadyExistsException;
    public Favourite getFavourite(String favId) throws FavouriteNotExistsException;;
    public List<Favourite> getAllFavourite();

    public Favourite updateFavourite(Favourite favourite, String favId);
    public void deleteFavourite(String favId) throws FavouriteNotExistsException;

    List<Favourite> getAllFavouriteByUserId(String userId);



}
