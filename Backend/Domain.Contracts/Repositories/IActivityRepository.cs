using Domain.Models.Entities;

namespace Domain.Contracts.Repositories;

public interface IActivityRepository : IRepositoryBase<Activity>
{
    public Task<IEnumerable<Activity>> GetActivitiesByModuleIdAsync(Guid moduleId, CancellationToken cancellationToken);
    public Task<IEnumerable<Activity>> GetUserActivitiesAsync(string userId, CancellationToken cancellationToken);
}
