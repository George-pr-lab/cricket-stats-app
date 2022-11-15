package com.stackroute.favouriteservice.exception;

public class FavouriteAlreadyExistsException extends Exception{
    public FavouriteAlreadyExistsException(String message) {
        super(message);
    }
    private static final long serialVersionUID = 1L;
}
