using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class ModuleRepository(ApplicationDbContext context)
    : RepositoryBase<CourseModule>(context), IModuleRepository
{
    public async Task<CourseModule?> GetModuleWithActivitiesAsync(Guid moduleId)
    {
        return await FindAll()
            .Include(m => m.Activities)
                .ThenInclude(a => a.ActivityType)
            .FirstOrDefaultAsync(m => m.Id == moduleId);
    }

    public Task<CourseModule?> GetUserModuleAsync(string userId, Guid moduleId) =>
        FindAll()
            .Where(m => m.Course.Users.Any(u => u.Id == userId))
            .Include(m => m.Course)
            .FirstOrDefaultAsync(m => m.Id == moduleId);

    public async Task<CourseModule?> GetUserModuleWithActivitiesAsync(string userId, Guid moduleId)
    {
        return await FindByCondition(m => m.Id == moduleId && m.Course.Users.Any(u => u.Id == userId))
            .Include(m => m.Activities)
                .ThenInclude(a => a.ActivityType)
            .FirstOrDefaultAsync();
    }
    public async Task<bool> ExistsByNameAsync(Guid courseId, string name, Guid? excludeModuleId = null)
    {
        var query = FindAll().Where(m => m.CourseId == courseId).Where(m => m.Name.ToLower() == name.ToLower());
        if (excludeModuleId.HasValue)
            query = query.Where(m => m.Id != excludeModuleId.Value);

        return await query.AnyAsync();
    }
}
