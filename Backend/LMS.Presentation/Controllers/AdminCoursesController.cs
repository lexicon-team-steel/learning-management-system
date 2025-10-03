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
            Description = "Returns courses for admin.")]
    [SwaggerResponse(StatusCodes.Status200OK, "List of courses", typeof(IEnumerable<CourseDto>))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - You do not have permission to access this resource.")]
    public async Task<ActionResult<IEnumerable<CourseDto>>> GetAllCourses() =>
        Ok(await courseService.GetAllCoursesAsync());

        [HttpPost]
        [SwaggerOperation(
                Summary = "Create a new course",
                Description = "Creates a new course. Only teachers are allowed.")]
        [SwaggerResponse(StatusCodes.Status201Created, "Course created", typeof(CourseDto))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Validation failed (e.g. endDate < startDate)")]
        [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
        [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - only teachers can create courses")]
        public async Task<ActionResult<CourseDto>> CreateCourse([FromBody] CreateCourseDto dto)
        {
                var course = await courseService.CreateAsync(dto);

                return CreatedAtAction(nameof(CreateCourse), new { status = "ok" }, course);
        }

}
