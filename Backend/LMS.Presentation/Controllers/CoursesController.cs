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
    [SwaggerResponse(StatusCodes.Status409Conflict, "Student doesn't have any course")]
    public async Task<ActionResult<CourseDto>> GetUserCourses() =>
        Ok(await courseService.GetUserCoursesAsync());


    [HttpGet("{courseId}/modules")]
    [Authorize]
    [SwaggerOperation(
        Summary = "Get course modules",
        Description = "Returns course with its modules for authorized user")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course with modules", typeof(CourseDto))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    // [SwaggerResponse(StatusCodes.Status409Conflict, "Student doesn't have any course")]
    public async Task<ActionResult<CourseDto>> GetStudentCourseWithModules(Guid courseId) =>
        Ok(await courseService.GetCourseWithModulesAsync(courseId));

    [HttpGet("{courseId}/participants")]
    [Authorize]
    [SwaggerOperation(
        Summary = "Get course participants",
        Description = "Returns course students for authorized user.")]
    [SwaggerResponse(StatusCodes.Status200OK, "List of students", typeof(IEnumerable<StudentDto>))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    // [SwaggerResponse(StatusCodes.Status409Conflict, "Student doesn't have any course")]
    public async Task<ActionResult<IEnumerable<StudentDto>>> GetStudentClassmates(Guid courseId)
    {
        return Ok(await courseService.GetCourseParticipantsAsync(courseId));
    }
}
