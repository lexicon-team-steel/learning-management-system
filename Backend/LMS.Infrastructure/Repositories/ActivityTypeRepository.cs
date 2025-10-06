using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class ActivityTypeRepository(ApplicationDbContext context)
    : RepositoryBase<ActivityType>(context), IActivityTypeRepository
{
    public Task<List<ActivityType>> GetActivityTypesAsync() =>
        FindAll().ToListAsync();
}
