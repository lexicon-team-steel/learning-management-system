using Domain.Models.Entities;

namespace Domain.Contracts.Repositories;

public interface IModuleRepository : IRepositoryBase<CourseModule>
{
    public Task<CourseModule?> GetModuleWithActivitiesAsync(Guid moduleId);
    public Task<CourseModule?> GetUserModuleAsync(string userId, Guid moduleId);
    public Task<CourseModule?> GetUserModuleWithActivitiesAsync(string userId, Guid moduleId);
    public Task<bool> ExistsByNameAsync(Guid courseId, string name, Guid? excludeModuleId = null);
}
