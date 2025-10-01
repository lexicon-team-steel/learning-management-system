using LMS.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Services.Seed;

public class DataSeeder(
    UserSeeder userSeeder,
    CourseSeeder courseSeeder,
    ActivityTypeSeeder activityTypeSeeder,
    ActivitySeeder activitySeeder,
    ApplicationDbContext context,
    UserManager<ApplicationUser> userManager)
{
    private readonly UserSeeder userSeeder = userSeeder;
    private readonly CourseSeeder courseSeeder = courseSeeder;
    private readonly ActivityTypeSeeder activityTypeSeeder = activityTypeSeeder;
    private readonly ActivitySeeder activitySeeder = activitySeeder;
    private readonly ApplicationDbContext context = context;
    private readonly UserManager<ApplicationUser> userManager = userManager;

    private const int UserCount = 30;
    private const int CourseCount = 10;

    public async Task SeedAsync(CancellationToken cancellationToken)
    {
        await userSeeder.SeedAsync(cancellationToken, UserCount);
        await courseSeeder.SeedAsync(cancellationToken, CourseCount);
        await activityTypeSeeder.SeedAsync(cancellationToken);
        await activitySeeder.SeedAsync(cancellationToken);

        await AssignUsersToCourses();
    }

    private async Task AssignUsersToCourses()
    {
        var courses = await context.Courses.Include(c => c.Users).ToListAsync();
        var firstCourse = courses.First();
        var lastCourse = courses.Last();

        if (firstCourse.Users.Count != 0) return;

        var students = await userManager.GetUsersInRoleAsync(UserSeeder.StudentRole);
        var half = students.Count / 2;

        foreach (var student in students.Take(half))
            firstCourse.Users.Add(student);

        foreach (var student in students.Skip(half))
            lastCourse.Users.Add(student);

        var teachers = await userManager.GetUsersInRoleAsync(UserSeeder.TeacherRole);
        foreach (var teacher in teachers)
        {
            teacher.Courses.Add(firstCourse);
            teacher.Courses.Add(lastCourse);
        }

        await context.SaveChangesAsync();
    }
}
