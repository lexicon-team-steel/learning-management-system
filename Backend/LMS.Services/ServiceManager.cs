using Service.Contracts;

namespace LMS.Services;

public class ServiceManager(
    Lazy<IAuthService> authService,
    Lazy<ICourseService> courseService) : IServiceManager
{
    public IAuthService AuthService => authService.Value;
    public ICourseService CourseService => courseService.Value;
}
