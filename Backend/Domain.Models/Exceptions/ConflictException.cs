namespace Domain.Models.Exceptions;

public class ConflictException(string message, string title = "Conflict")
    : ApiException(message, title)
{ }