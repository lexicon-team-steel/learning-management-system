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

    [HttpGet("{courseId}/participants")]
    [SwaggerOperation(
    Summary = "Get course with participants",
    Description = "Returns course with its participants for admin")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course with participants", typeof(CourseDto))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Course not found")]
    public async Task<ActionResult<CourseDto>> GetCourseWithParticipants(Guid courseId) =>
    Ok(await courseService.GetCourseWithParticipantsAsync(courseId));

    [HttpDelete("{courseId}/participants/{participantId}")]
    [SwaggerOperation(
        Summary = "Delete participant from a  course",
        Description = "Deletes participant from a course. Only teachers can perform this action.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Participant deleted successfully")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - only teachers can delete participants")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Course or user not found")]
    public async Task<IActionResult> DeleteCourseParticipant(Guid courseId, string participantId)
    {
        await courseService.DeleteParticipantAsync(courseId, participantId);
        return Ok(new { success = true });
    }

    [HttpPost("{courseId}/participants")]
    [SwaggerOperation(
            Summary = "Add participant to a course",
            Description = "Adds a new participant. Only teachers are allowed.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Participant added")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - only teachers can add participants")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Course or user not found")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "A user is already in this course")]

    public async Task<ActionResult> AddParticipantToCourse(Guid courseId, [FromBody] CreateCourseParticipantDto dto)
    {
        await courseService.AddParticipantToCourseAsync(courseId, dto);
        return CreatedAtAction(nameof(AddParticipantToCourse), new { status = "ok" });
    }

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

    [HttpPut("{courseId}/modules/{moduleId}")]
    [SwaggerOperation(
        Summary = "Update an existing module",
        Description = "Allows teachers to update module details.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Module updated successfully", typeof(CourseModuleDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Validation failed")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - only teachers can edit modules")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Module not found")]
    public async Task<ActionResult<CourseModuleDto>> UpdateModule(Guid courseId, Guid moduleId, [FromBody] UpdateModuleDto dto)
    {
        var updatedModule = await moduleService.UpdateAsync(courseId, moduleId, dto);
        return Ok(updatedModule);
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

    [HttpDelete("{courseId}/modules/{moduleId}")]
    [SwaggerOperation(
        Summary = "Delete a module",
        Description = "Deletes a module. Only teachers can perform this action.")]
    [SwaggerResponse(StatusCodes.Status200OK, "Module deleted successfully")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - only teachers can delete modules")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Module not found")]
    public async Task<IActionResult> DeleteModule(Guid courseId, Guid moduleId)
    {
        await moduleService.DeleteAsync(courseId, moduleId);
        return Ok(new { success = true });
    }

}
