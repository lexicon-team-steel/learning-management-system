using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infractructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infractructure.Repositories;

public class CourseRepository(ApplicationDbContext context)
    : RepositoryBase<Course>(context), ICourseRepository
{
    public Task<Course?> GetCourseAsync(string studentId) =>
        GetCourseByUserId(studentId, includeModules: false);

    public Task<Course?> GetCourseWithModulesAsync(string studentId) =>
        GetCourseByUserId(studentId, includeModules: true);

    private Task<Course?> GetCourseByUserId(string studentId, bool includeModules = false)
    {
        var courses = FindAll();
        if (includeModules) courses = courses.Include(c => c.Modules);

        return courses
            .Where(s => s.Users.Any(u => u.Id == studentId))
            .FirstOrDefaultAsync();
    }
}