using Domain.Models.Entities;

namespace Domain.Contracts.Repositories;

public interface IActivityTypeRepository : IRepositoryBase<ActivityType>
{
    public Task<List<ActivityType>> GetActivityTypesAsync();
}
