namespace Domain.Models.Exceptions;

public class NotFoundException(string message = "Not Found", int statusCode = 404)
    : ApiException(message, statusCode)
{ }
