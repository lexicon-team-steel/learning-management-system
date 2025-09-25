using Service.Contracts;

namespace LMS.Services;

public class ServiceManager(
    Lazy<IAuthService> authService,
    Lazy<IStudentService> studentService,
    Lazy<ICourseService> courseService) : IServiceManager
{
    public IAuthService AuthService => authService.Value;
    public IStudentService StudentService => studentService.Value;
    public ICourseService CourseService => courseService.Value;
}
