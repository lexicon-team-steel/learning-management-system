using Domain.Contracts.Repositories;
using LMS.Infrastructure.Data;

namespace LMS.Infrastructure.Repositories;

public class UnitOfWork(ApplicationDbContext context, Lazy<IUserRepository> UserRepository,
Lazy<ICourseRepository> CourseRepository, Lazy<IModuleRepository> ModuleRepository, Lazy<IActivityRepository> ActivityRepository, Lazy<IActivityTypeRepository> ActivityTypeRepository) : IUnitOfWork
{
    public IUserRepository Users => UserRepository.Value;
    public ICourseRepository Courses => CourseRepository.Value;
    public IModuleRepository Modules => ModuleRepository.Value;
    public IActivityRepository Activities => ActivityRepository.Value;
    public IActivityTypeRepository ActivityTypes => ActivityTypeRepository.Value;
    public async Task CompleteAsync() => await context.SaveChangesAsync();
}
