using System.Security.Claims;
using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.StudentDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Swashbuckle.AspNetCore.Annotations;

namespace LMS.Presentation.Controllers;

[Route("api/courses")]
[ApiController]
public class CoursesController(IServiceManager serviceManager) : ControllerBase
{
    private readonly ICourseService courseService = serviceManager.CourseService;

    [HttpGet]
    [Authorize]
    [SwaggerOperation(
            Summary = "Get user courses",
            Description = "Returns courses for a user, base on JWT token.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course", typeof(IEnumerable<CourseDto>))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    // [SwaggerResponse(StatusCodes.Status404NotFound, "User not found by JWT token")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "Student doesn't have any course")]
    public async Task<ActionResult<CourseDto>> GetUserCourses()
    {
        return Ok(await courseService.GetUserCoursesAsync());
    }
}
