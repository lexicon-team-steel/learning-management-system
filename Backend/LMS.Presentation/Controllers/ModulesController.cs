using LMS.Shared.DTOs.CourseModuleDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Swashbuckle.AspNetCore.Annotations;

namespace LMS.Presentation.Controllers;

[Route("api/modules")]
[ApiController]
public class ModulesController(IServiceManager serviceManager) : ControllerBase
{
    private readonly IModuleService moduleService = serviceManager.ModuleService;

    [HttpGet("{moduleId}")]
    [Authorize]
    [SwaggerOperation(
        Summary = "Get module",
        Description = "Returns module for authorized user")]
    [SwaggerResponse(StatusCodes.Status200OK, "Module", typeof(CourseModuleDto))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Module not found or no access")]
    public async Task<ActionResult<CourseModuleDto>> GetModule(Guid moduleId) =>
        Ok(await moduleService.GetUserModuleAsync(moduleId));
}
