using LMS.Shared.DTOs.ActivityDtos;
using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.CourseModuleDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Swashbuckle.AspNetCore.Annotations;

namespace LMS.Presentation.Controllers;

[Route("api/admin/activityTypes")]
[ApiController]
[Authorize(Roles = "Teacher")]
public class AdminActivityTypesController(IServiceManager serviceManager) : ControllerBase
{
    private readonly IActivityTypeService typeService = serviceManager.ActivityTypeService;

    [HttpGet]
    [SwaggerOperation(
            Summary = "Get all activity types",
            Description = "Returns activity types for admin.")]
    [SwaggerResponse(StatusCodes.Status200OK, "List of activity types", typeof(IEnumerable<ActivityTypeDto>))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - You do not have permission to access this resource.")]
    public async Task<ActionResult<IEnumerable<CourseDto>>> GetAllActivityTypes() =>
        Ok(await typeService.GetActivityTypesAsync());
}
