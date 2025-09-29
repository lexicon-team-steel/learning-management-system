using Service.Contracts;

namespace LMS.Services;

public class ServiceManager(
    Lazy<IAuthService> authService,
    Lazy<ICourseService> courseService, Lazy<IModuleService> moduleService, Lazy<IActivityService> activityService) : IServiceManager
{
    public IAuthService AuthService => authService.Value;
    public ICourseService CourseService => courseService.Value;
    public IModuleService ModuleService => moduleService.Value;
    public IActivityService ActivityService => activityService.Value;
}
