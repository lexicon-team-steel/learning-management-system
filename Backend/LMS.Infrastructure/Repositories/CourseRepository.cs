using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class CourseRepository(ApplicationDbContext context)
    : RepositoryBase<Course>(context), ICourseRepository
{

    public Task<List<Course>> GetUserCoursesAsync(string userId) =>
        FindAll().Where(c => c.Users.Any(u => u.Id == userId)).ToListAsync();

    public Task<Course?> GetCourseByIdAsync(Guid id, bool includeModules = false, bool includeUsers = false)
    {
        var course = FindByCondition(c => c.Id == id);
        if (includeModules) course = course.Include(c => c.Modules);
        if (includeUsers) course = course.Include(c => c.Users);

        return course.FirstOrDefaultAsync();
    }
    public Task<bool> UserHasAccessToCourse(string userId, Guid courseId) =>
        FindByCondition(c => c.Users.Any(u => u.Id == userId) && c.Id == courseId).AnyAsync();



    public Task<Course?> GetCourseAsync(string studentId) =>
        GetCourseByUserId(studentId, includeModules: false);

    public Task<Course?> GetCourseWithModulesAsync(string studentId) =>
        GetCourseByUserId(studentId, includeModules: true);

    public async Task<IEnumerable<ApplicationUser>?> GetCourseClassmatesAsync(string studentId)
    {
        var course = await GetCourseByUserId(studentId, includeUsers: true);
        return course?.Users.Where(u => u.Id != studentId);
    }

    private Task<Course?> GetCourseByUserId(string studentId, bool includeModules = false, bool includeUsers = false)
    {
        var courses = FindAll();
        if (includeModules) courses = courses.Include(c => c.Modules);
        if (includeUsers) courses = courses.Include(c => c.Users);

        return courses
            .Where(s => s.Users.Any(u => u.Id == studentId))
            .FirstOrDefaultAsync();
    }

}
