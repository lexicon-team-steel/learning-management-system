using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.CourseModuleDtos;
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
    private readonly IModuleService moduleService = serviceManager.ModuleService;


    [HttpGet]
    [SwaggerOperation(
            Summary = "Get all courses",
            Description = "Returns courses for admin.")]
    [SwaggerResponse(StatusCodes.Status200OK, "List of courses", typeof(IEnumerable<CourseDto>))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - You do not have permission to access this resource.")]
    public async Task<ActionResult<IEnumerable<CourseDto>>> GetAllCourses() =>
        Ok(await courseService.GetAllCoursesAsync());

    [HttpGet("{courseId}")]
    [SwaggerOperation(
    Summary = "Get course with modules",
    Description = "Returns course with its modules for admin")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course with modules", typeof(CourseDto))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Course not found")]
    public async Task<ActionResult<CourseDto>> GetCourseWithModules(Guid courseId) =>
    Ok(await courseService.GetCourseWithModulesAsync(courseId));

    [HttpPost]
    [SwaggerOperation(
            Summary = "Create a new course",
            Description = "Creates a new course. Only teachers are allowed.")]
    [SwaggerResponse(StatusCodes.Status201Created, "Course created", typeof(CourseDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Validation failed (e.g. endDate < startDate)")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - only teachers can create courses")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "A course with the same name already exists")]
    public async Task<ActionResult<CourseDto>> CreateCourse([FromBody] CreateCourseDto dto)
    {
        var course = await courseService.CreateAsync(dto);

        return CreatedAtAction(nameof(CreateCourse), new { status = "ok" }, course);
    }

    [HttpPost("{courseId}/modules")]
    [SwaggerOperation(
            Summary = "Create a new module",
            Description = "Creates a new module in a course. Only teachers are allowed.")]
    [SwaggerResponse(StatusCodes.Status201Created, "Module created", typeof(CourseModuleDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Validation failed (e.g. endDate < startDate)")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - only teachers can create courses")]
    public async Task<ActionResult<CourseModuleDto>> CreateModule(Guid courseId, [FromBody] CreateModuleDto dto)
    {
        var module = await moduleService.CreateModuleAsync(courseId, dto);

        return CreatedAtAction(nameof(CreateModule), new { status = "ok" }, module);
    }

    [HttpPut("{courseId}")]
    [SwaggerOperation(
        Summary = "Update an existing course",
        Description = "Allows teachers to update course details.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course updated successfully", typeof(CourseDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Validation failed")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - only teachers can edit courses")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Course not found")]
    public async Task<ActionResult<CourseDto>> UpdateCourse(Guid courseId, [FromBody] UpdateCourseDto dto)
    {
        var updatedCourse = await courseService.UpdateAsync(courseId, dto);
        return Ok(updatedCourse);
    }


    [HttpDelete("{courseId}")]
    [SwaggerOperation(
        Summary = "Delete a course",
        Description = "Deletes a course. Only teachers can perform this action.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course deleted successfully")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - only teachers can delete courses")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Course not found")]
    public async Task<IActionResult> DeleteCourse(Guid courseId)
    {
        await courseService.DeleteAsync(courseId);
        return Ok(new { success = true });
    }

}
