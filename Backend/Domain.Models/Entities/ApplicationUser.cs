using Microsoft.AspNetCore.Identity;

namespace Domain.Models.Entities;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = null!;

    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpireTime { get; set; }

    public ICollection<Course> Courses { get; set; } = [];
}
