using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class ModuleRepository(ApplicationDbContext context)
    : RepositoryBase<CourseModule>(context), IModuleRepository
{
    public Task<CourseModule?> GetModuleAsync(string userId, Guid moduleId) =>
        FindAll()
            .Where(m => m.Course.Users.Any(u => u.Id == userId))
            .FirstOrDefaultAsync(m => m.Id == moduleId);
}