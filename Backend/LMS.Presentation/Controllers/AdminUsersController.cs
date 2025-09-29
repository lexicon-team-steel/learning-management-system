using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.UserDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Swashbuckle.AspNetCore.Annotations;

namespace LMS.Presentation.Controllers;

[Route("api/admin/users")]
[ApiController]
[Authorize(Roles = "Teacher")]
public class AdminUsersController(IServiceManager serviceManager) : ControllerBase
{
    private readonly IUserService userService = serviceManager.UserService;

    [HttpGet]
    [SwaggerOperation(
            Summary = "Get all users",
            Description = "Returns users for admin. Can be filtered by name or role")]
    [SwaggerResponse(StatusCodes.Status200OK, "List of user", typeof(IEnumerable<UserDto>))]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Unauthorized - JWT token missing or invalid")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers([FromQuery] UserQueryParameters userParams) =>
        Ok(await userService.GetAllUsersAsync(userParams));
}
