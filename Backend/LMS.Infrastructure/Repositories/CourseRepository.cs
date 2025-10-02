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

    public void Add(Course course) => Add(course);
}
