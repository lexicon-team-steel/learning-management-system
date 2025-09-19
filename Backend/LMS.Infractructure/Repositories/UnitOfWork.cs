using Domain.Contracts.Repositories;
using LMS.Infractructure.Data;

namespace LMS.Infractructure.Repositories;

public class UnitOfWork(ApplicationDbContext context, Lazy<IUserRepository> UserRepository) : IUnitOfWork
{
    public IUserRepository Students => UserRepository.Value;
    public async Task CompleteAsync() => await context.SaveChangesAsync();
}
