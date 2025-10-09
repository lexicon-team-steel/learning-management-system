namespace Domain.Models.Exceptions;

public class ForbiddenException(string message = "Forbidden", int statusCode = 403)
    : ApiException(message, statusCode)
{ }
