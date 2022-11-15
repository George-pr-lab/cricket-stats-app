package com.stackroute.favouriteservice.service;

import com.stackroute.favouriteservice.exception.FavouriteAlreadyExistsException;
import com.stackroute.favouriteservice.exception.FavouriteNotExistsException;
import com.stackroute.favouriteservice.model.Favourite;
import com.stackroute.favouriteservice.repository.FavouriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class FavouriteServiceImpl implements FavouriteService {
    @Autowired
    FavouriteRepository favouriteRepository;

    @Override
    public Favourite createFavourite(Favourite favourite) throws FavouriteAlreadyExistsException {
        try{
            return favouriteRepository.save(favourite);
        }catch (Exception e){
            throw new FavouriteAlreadyExistsException("Favorite already exist "+favourite);
        }
    }

    @Override
    public Favourite getFavourite(String favId) throws FavouriteNotExistsException {
        try {
            Optional<Favourite> favouriteRecord = favouriteRepository.findById(favId);
            if(favouriteRecord.isPresent()) {
                return favouriteRecord.get();
            }else {
                return null;
            }
        } catch (NoSuchElementException e) {
            throw new FavouriteNotExistsException("Category not found");
        }
    }

    @Override
    public List<Favourite> getAllFavourite() {
        return favouriteRepository.findAll();
    }

    @Override
    public Favourite updateFavourite(Favourite favourite, String favId)  {
        Optional<Favourite> favouriteRecord = favouriteRepository.findById(favId);

        if(favouriteRecord.isPresent()){
            Favourite fetchedFavourite =favouriteRecord.get();
            fetchedFavourite.setName(favourite.getName());
            fetchedFavourite.setCountry(favourite.getCountry());
            fetchedFavourite.setFavouriteCreatedBy(favourite.getFavouriteCreatedBy());
            fetchedFavourite.setFavouriteCreationDate(LocalDateTime.now());
            return favouriteRepository.save(fetchedFavourite);
        }else return null;
    }

    @Override
    public void deleteFavourite(String favId) throws FavouriteNotExistsException {
        Favourite favourite =favouriteRepository.findById(favId)
                .orElseThrow(()-> new FavouriteNotExistsException("Favourite Not Found "+favId));

        favouriteRepository.deleteById(favId);
    }

    @Override
    public List<Favourite> getAllFavouriteByUserId(String userId) {
        return favouriteRepository.findAllFavouriteByFavouriteCreatedBy(userId);
    }

}
