package com.stackroute.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND,reason = "User with specified details not found")
public class UserNotExistsException extends Exception{
    private static final long serialVersionUID = 1L;
}
