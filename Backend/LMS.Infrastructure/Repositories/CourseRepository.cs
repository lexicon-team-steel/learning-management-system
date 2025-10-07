using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class CourseRepository(ApplicationDbContext context)
    : RepositoryBase<Course>(context), ICourseRepository
{
    public Task<List<Course>> GetCoursesAsync() =>
        FindAll().ToListAsync();

    public Task<List<Course>> GetUserCoursesAsync(string userId) =>
        FindAll().Where(c => c.Users.Any(u => u.Id == userId)).ToListAsync();

    public Task<Course?> GetUserCourseWithModulesAsync(string userId, Guid courseId) =>
        FindAll()
            .Include(c => c.Modules)
            .Where(c => c.Users.Any(u => u.Id == userId))
            .FirstOrDefaultAsync(c => c.Id == courseId);

    public Task<List<ApplicationUser>> GetUserCourseParticipantsAsync(string userId, Guid courseId, string? role)
    {
        var users = FindAll()
            .Where(c => c.Users.Any(u => u.Id == userId) && c.Id == courseId)
            .SelectMany(s => s.Users);

        if (!string.IsNullOrEmpty(role))
            users = users.Where(u => u.UserRoles.Any(u => EF.Functions.Like(u.Role.Name, role)));

        return users
            .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .ToListAsync();
    }

    public async Task<bool> ExistsByNameAsync(string name, Guid? excludeCourseId = null)
    {
        var query = FindAll().Where(c => c.Name.ToLower() == name.ToLower());
        if (excludeCourseId.HasValue)
            query = query.Where(c => c.Id != excludeCourseId.Value);

        return await query.AnyAsync();
    }

    public async Task<Course?> GetCourseWithModulesAsync(Guid courseId)
    {
        return await FindAll()
            .Include(c => c.Modules)
            .FirstOrDefaultAsync(c => c.Id == courseId);
    }
}
