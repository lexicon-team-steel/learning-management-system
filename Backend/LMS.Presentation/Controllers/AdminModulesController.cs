using LMS.Shared.DTOs.ActivityDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Swashbuckle.AspNetCore.Annotations;

namespace LMS.Presentation.Controllers;

[Route("api/admin/modules")]
[ApiController]
[Authorize(Roles = "Teacher")]
public class AdminModulesController(IServiceManager serviceManager) : ControllerBase
{
    private readonly IActivityService activityService = serviceManager.ActivityService;

    [HttpPost("{moduleId}/activities")]
    [SwaggerOperation(
        Summary = "Create a new activity in a module",
        Description = "Creates a new activity for the given module. Only teachers are allowed.")]
    [SwaggerResponse(StatusCodes.Status201Created, "Activity created", typeof(ActivityDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Validation failed (e.g. dates overlap, endDate < startDate)")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - only teachers can create activities")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Module not found or no access")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "There was a conflict creating the activity (e.g. overlapping dates)")]
    public async Task<ActionResult<ActivityDto>> CreateActivity(Guid moduleId, [FromBody] CreateActivityDto dto)
    {
        var activity = await activityService.CreateActivityAsync(moduleId, dto);

        return CreatedAtAction(
            nameof(CreateActivity),
            new { moduleId = moduleId, activityId = activity.Id },
            activity
        );
    }
}
