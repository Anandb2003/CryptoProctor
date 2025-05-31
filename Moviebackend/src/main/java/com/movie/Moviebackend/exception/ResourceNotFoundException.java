package com.movie.Moviebackend.exception;

public class ResourceNotFoundException extends RuntimeException
{
    public ResourceNotFoundException(String message)
    {
    	super(message);
    }
}
