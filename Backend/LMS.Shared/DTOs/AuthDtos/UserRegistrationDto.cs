using System.ComponentModel.DataAnnotations;

namespace LMS.Shared.DTOs.AuthDtos;

public record UserRegistrationDto
{
    [Required]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
    public string Password { get; init; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; init; } = string.Empty;

    public string? Role { get; init; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string FirstName { get; init; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string LastName { get; init; } = string.Empty;
}
