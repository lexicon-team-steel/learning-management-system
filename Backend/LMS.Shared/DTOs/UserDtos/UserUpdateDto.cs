using System.ComponentModel.DataAnnotations;

namespace LMS.Shared.DTOs.UserDtos;

public record UserUpdateDto
{
    [Required]
    public string Id { get; set; } = string.Empty;

    public string? Password { get; init; }

    [Required]
    [EmailAddress]
    public string Email { get; init; } = string.Empty;

    public string Role { get; init; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string FirstName { get; init; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string LastName { get; init; } = string.Empty;
}
