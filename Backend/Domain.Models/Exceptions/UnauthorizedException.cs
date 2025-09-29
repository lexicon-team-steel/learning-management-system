namespace Domain.Models.Exceptions;

public class UnauthorizedException(string message = "Not authorized", int statusCode = 401)
    : ApiException(message, statusCode)
{ }
