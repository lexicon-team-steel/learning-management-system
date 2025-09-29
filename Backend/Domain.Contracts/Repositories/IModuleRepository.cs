using Domain.Models.Entities;

namespace Domain.Contracts.Repositories;

public interface IModuleRepository : IRepositoryBase<CourseModule>
{
    public Task<CourseModule> GetModuleAsync(string userId, Guid moduleId);
}