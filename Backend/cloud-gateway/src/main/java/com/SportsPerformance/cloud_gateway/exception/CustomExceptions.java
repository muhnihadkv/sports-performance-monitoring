package com.SportsPerformance.cloud_gateway.exception;

public class CustomExceptions {
    public static class UnauthorizedAccessException extends RuntimeException {
        public UnauthorizedAccessException(String message) {
            super(message);
        }
    }
}
