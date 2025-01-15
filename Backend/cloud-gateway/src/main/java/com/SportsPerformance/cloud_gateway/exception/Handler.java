package com.SportsPerformance.cloud_gateway.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class Handler {
    @ExceptionHandler(CustomExceptions.UnauthorizedAccessException.class)
    public ResponseEntity<String> handleUnauthorizedAccessException(CustomExceptions.UnauthorizedAccessException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
    }
}
