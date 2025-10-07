namespace Service.Contracts;

public interface IServiceManager
{
    IAuthService AuthService { get; }
    ICourseService CourseService { get; }
    IModuleService ModuleService { get; }
    IActivityService ActivityService { get; }
    IActivityTypeService ActivityTypeService { get; }
    IUserService UserService { get; }
}
