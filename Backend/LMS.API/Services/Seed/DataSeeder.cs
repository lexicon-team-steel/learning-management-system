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

    public async Task SeedAsync(CancellationToken cancellationToken)
    {
        await userSeeder.SeedAsync(cancellationToken);
        await courseSeeder.SeedAsync(cancellationToken);
        await activityTypeSeeder.SeedAsync(cancellationToken);
        await activitySeeder.SeedAsync(cancellationToken);

        await AssignStudentsToCourse();
    }

    private async Task AssignStudentsToCourse()
    {
        var course = await context.Courses.Include(c => c.Users).FirstAsync();

        if (course.Users.Count != 0) return;

        var students = await userManager.GetUsersInRoleAsync(UserSeeder.StudentRole);

        foreach (var student in students)
        {
            course.Users.Add(student);
        }

        await context.SaveChangesAsync();
    }
}
