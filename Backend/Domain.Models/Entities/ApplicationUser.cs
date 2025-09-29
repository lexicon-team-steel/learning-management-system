using Microsoft.AspNetCore.Identity;

namespace Domain.Models.Entities;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string FullName => FirstName + " " + LastName;

    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpireTime { get; set; }

    public ICollection<ApplicationUserRole> UserRoles { get; set; } = [];
    public ICollection<Course> Courses { get; set; } = [];
}
