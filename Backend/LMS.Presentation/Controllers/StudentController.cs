using System.Security.Claims;
using Bogus;
using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.ForFrontEndTemplate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Swashbuckle.AspNetCore.Annotations;

namespace LMS.Presentation.Controllers;

[Route("api/students")]
[ApiController]
public class StudentsController(IServiceManager serviceManager) : ControllerBase
{
    private readonly IStudentService studentService = serviceManager.StudentService;

    [HttpGet("me/course")]
    [Authorize(Roles = "Student")]
    [SwaggerOperation(
        Summary = "Get student course",
        Description = "Returns personal course for a student. Student is identified by JWT token.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course", typeof(CourseDto))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Student not found by JWT token")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "Student doesn't have any course")]
    public async Task<ActionResult<CourseDto>> GetStudentCourse()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        return Ok(await studentService.GetCourseAsync(userId));
    }

    [HttpGet("me/course-modules")]
    [Authorize(Roles = "Student")]
    [SwaggerOperation(
        Summary = "Get student course modules",
        Description = "Returns personal course with its modules for a student. Student is identified by JWT token.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course with modules", typeof(CourseDto))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Student not found by JWT token")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "Student doesn't have any course")]
    public async Task<ActionResult<CourseDto>> GetStudentCourseWithModules()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        return Ok(await studentService.GetCourseWithModulesAsync(userId));
    }
}
