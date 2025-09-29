namespace Domain.Models.Exceptions;

public abstract class ApiException(string message, int statusCode)
    : Exception(message)
{
    public int StatusCode { get; } = statusCode;
}

