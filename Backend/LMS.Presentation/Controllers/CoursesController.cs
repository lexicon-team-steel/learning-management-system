using System.Security.Claims;
using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.UserDtos;
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
            Description = "Returns courses for authorized user.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course", typeof(IEnumerable<CourseDto>))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    public async Task<ActionResult<IEnumerable<CourseDto>>> GetUserCourses() =>
        Ok(await courseService.GetUserCoursesAsync());


    [HttpGet("{courseId}")]
    [Authorize]
    [SwaggerOperation(
        Summary = "Get course with modules",
        Description = "Returns course with its modules for authorized user")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course with modules", typeof(CourseDto))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Course not found or no access")]
    public async Task<ActionResult<CourseDto>> GetCourseWithModules(Guid courseId) =>
        Ok(await courseService.GetCourseWithModulesAsync(courseId));

    [HttpGet("{courseId}/participants")]
    [Authorize]
    [SwaggerOperation(
        Summary = "Get course participants",
        Description = "Returns course participants for authorized user.")]
    [SwaggerResponse(StatusCodes.Status200OK, "List of participants", typeof(IEnumerable<UserDto>))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetCourseParticipants(Guid courseId)
    {
        return Ok(await courseService.GetCourseParticipantsAsync(courseId));
    }
}
