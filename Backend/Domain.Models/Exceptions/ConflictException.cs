namespace Domain.Models.Exceptions;

public class ConflictException(string message = "Conflict", int statusCode = 409)
    : ApiException(message, statusCode)
{ }
