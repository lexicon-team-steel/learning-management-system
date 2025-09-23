using Service.Contracts;

namespace LMS.Services;

public class ServiceManager(
    Lazy<IAuthService> authService,
    Lazy<IStudentService> studentService) : IServiceManager
{
    public IAuthService AuthService => authService.Value;
    public IStudentService StudentService => studentService.Value;
}
