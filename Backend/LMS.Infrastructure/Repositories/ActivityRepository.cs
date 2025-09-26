using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class ActivityRepository(ApplicationDbContext context)
    : RepositoryBase<Activity>(context), IActivityRepository
{
    public async Task<IEnumerable<Activity>> GetActivitiesByModuleIdAsync(Guid moduleId, CancellationToken cancellationToken)
    {
        return await FindByCondition(a => a.CourseModuleId == moduleId)
            .Include(a => a.ActivityType)
            .OrderBy(a => a.StartDate)
            .ToListAsync(cancellationToken);
    }
}