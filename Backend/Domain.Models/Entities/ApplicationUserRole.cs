using Domain.Models.Entities;
using Microsoft.AspNetCore.Identity;

public class ApplicationUserRole : IdentityUserRole<string>
{
    public ApplicationUser User { get; set; } = null!;
    public ApplicationRole Role { get; set; } = null!;
}