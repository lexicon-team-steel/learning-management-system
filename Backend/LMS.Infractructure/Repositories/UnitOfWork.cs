using Domain.Contracts.Repositories;
using LMS.Infractructure.Data;

namespace LMS.Infractructure.Repositories;

public class UnitOfWork(ApplicationDbContext context, Lazy<IUserRepository> UserRepository,
Lazy<ICourseRepository> CourseRepository) : IUnitOfWork
{
    public IUserRepository Students => UserRepository.Value;
    public ICourseRepository Courses => CourseRepository.Value;
    public async Task CompleteAsync() => await context.SaveChangesAsync();
}
