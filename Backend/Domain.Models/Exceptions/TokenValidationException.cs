namespace Domain.Models.Exceptions;

public class TokenValidationException(string message, int statusCode = 401)
    : ApiException(message, statusCode)
{ }
