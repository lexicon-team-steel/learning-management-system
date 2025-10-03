using LMS.Shared.DTOs.AuthDtos;
using LMS.Shared.DTOs.UserDtos;
using LMS.Shared.Parameters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Swashbuckle.AspNetCore.Annotations;

namespace LMS.Presentation.Controllers;

[Route("api/admin/users")]
[ApiController]
[Authorize(Roles = "Teacher")]
public class AdminUsersController(IServiceManager serviceManager) : ControllerBase
{
    [HttpGet]
    [SwaggerOperation(
            Summary = "Get all users",
            Description = "Returns users for admin. Can be filtered by name or role")]
    [SwaggerResponse(StatusCodes.Status200OK, "List of user", typeof(IEnumerable<UserDto>))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - You do not have permission to access this resource.")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers([FromQuery] UserQueryParameters userParams) =>
        Ok(await serviceManager.UserService.GetAllUsersAsync(userParams));

    [HttpPost]
    [SwaggerOperation(
            Summary = "Create user",
            Description = "Creates a new user account with the provided registration details")]
    [SwaggerResponse(StatusCodes.Status201Created, "User successfully created")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid input or registration failed")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - You do not have permission to access this resource.")]
    public async Task<ActionResult> CreateUser(UserRegistrationDto userRegistrationDto)
    {
        IdentityResult result = await serviceManager.AuthService.RegisterUserAsync(userRegistrationDto);
        return result.Succeeded
                ? CreatedAtAction(nameof(CreateUser), new { status = "ok" })
                : BadRequest(new { errors = result.ToErrorDictionary() });
    }
}
