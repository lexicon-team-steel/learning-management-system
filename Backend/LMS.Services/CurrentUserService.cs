using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Service.Contracts;

namespace LMS.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? UserId =>
        _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

    public string? Role =>
        _httpContextAccessor.HttpContext?.User.FindFirstValue("role");

    public bool IsTeacher => Role == "Teacher";

    public bool IsStudent => Role == "Student";
}