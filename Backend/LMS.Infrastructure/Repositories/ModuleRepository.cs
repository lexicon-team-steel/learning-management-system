using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infrastructure.Data;

namespace LMS.Infrastructure.Repositories;

public class ModuleRepository(ApplicationDbContext context)
    : RepositoryBase<CourseModule>(context), IModuleRepository
{
    public Task<CourseModule> GetModuleAsync(string userId, Guid moduleId)
    {
        throw new NotImplementedException();
    }
}