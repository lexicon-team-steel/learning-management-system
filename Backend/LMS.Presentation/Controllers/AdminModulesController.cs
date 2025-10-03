
using LMS.Shared.DTOs.CourseModuleDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Swashbuckle.AspNetCore.Annotations;

namespace LMS.Presentation.Controllers;

[Route("api/courses/{courseId}/modules")]
[ApiController]
[Authorize(Roles = "Teacher")]
public class AdminModulesController(IServiceManager serviceManager) : ControllerBase
{
	private readonly IModuleService moduleService = serviceManager.ModuleService;

	[HttpGet]
	[SwaggerOperation(
			Summary = "Get all modules from a course",
			Description = "Returns modules for admin.")]
	[SwaggerResponse(StatusCodes.Status200OK, "List of modules", typeof(IEnumerable<CourseModuleDto>))]
	[SwaggerResponse(StatusCodes.Status401Unauthorized, "Unauthorized - JWT token missing or invalid")]
	[SwaggerResponse(StatusCodes.Status403Forbidden, "Forbidden - You do not have permission to access this resource.")]
	public async Task<ActionResult<IEnumerable<CourseModuleDto>>> GetAllCourseModules(Guid courseId) =>
		Ok(await moduleService.GetAllModulesFromCourseAsync(courseId));
}