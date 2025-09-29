using LMS.Shared.DTOs.ActivityDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Swashbuckle.AspNetCore.Annotations;

namespace LMS.Presentation.Controllers;

[Route("api/activities")]
[ApiController]
public class ActivitiesController(IServiceManager serviceManager) : ControllerBase
{
    private readonly IActivityService activityService = serviceManager.ActivityService;

    [HttpGet]
    [Authorize]
    [SwaggerOperation(
        Summary = "Get user activities",
        Description = "Returns all future activities for the logged-in user across all modules/courses.")]
    [SwaggerResponse(StatusCodes.Status200OK, "List of user activities", typeof(IEnumerable<ActivityDto>))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    public async Task<ActionResult<IEnumerable<ActivityDto>>> GetUserActivities()
    {
        var activities = await activityService.GetUserActivitiesAsync();
        return Ok(activities);
    }
}
