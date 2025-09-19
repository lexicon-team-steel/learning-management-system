using Domain.Contracts.Repositories;
using LMS.Infractructure.Data;

namespace LMS.Infractructure.Repositories;

public class UnitOfWork(ApplicationDbContext context, Lazy<IStudentRepository> studentRepository) : IUnitOfWork
{
    public IStudentRepository Students => studentRepository.Value;
    public async Task CompleteAsync() => await context.SaveChangesAsync();
}
