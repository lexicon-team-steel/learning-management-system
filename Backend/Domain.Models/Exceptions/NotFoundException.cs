namespace Domain.Models.Exceptions;

public class NotFoundException(string message, string title = "Not Found")
    : ApiException(message, title)
{ }
