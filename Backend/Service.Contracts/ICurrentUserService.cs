namespace Service.Contracts;

public interface ICurrentUserService
{
    string? UserId { get; }
    string? Role { get; }
    bool IsTeacher { get; }
    bool IsStudent { get; }
}
