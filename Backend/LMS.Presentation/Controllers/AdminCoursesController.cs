using LMS.Shared.DTOs.CourseDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Swashbuckle.AspNetCore.Annotations;

namespace LMS.Presentation.Controllers;

[Route("api/admin/courses")]
[ApiController]
[Authorize(Roles = "Teacher")]
public class AdminCoursesController(IServiceManager serviceManager) : ControllerBase
{
    private readonly ICourseService courseService = serviceManager.CourseService;

    [HttpGet]
    [SwaggerOperation(
            Summary = "Get all courses",
            Description = "Returns courses for authorized user.")]
    [SwaggerResponse(StatusCodes.Status200OK, "List of courses", typeof(IEnumerable<CourseDto>))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    public async Task<ActionResult<IEnumerable<CourseDto>>> GetAllCourses() =>
        Ok(await courseService.GetAllCoursesAsync());

}