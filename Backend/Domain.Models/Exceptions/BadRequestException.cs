namespace Domain.Models.Exceptions;

public class BadRequestException(string message = "Bad Request", int statusCode = 400)
    : ApiException(message, statusCode)
{ }
