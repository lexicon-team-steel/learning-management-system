using LMS.Infractructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Services.Seed;

public class DataSeeder
{
    private readonly UserSeeder userSeeder;
    private readonly CourseSeeder courseSeeder;
    private readonly ApplicationDbContext context;
    private readonly UserManager<ApplicationUser> userManager;

    public DataSeeder(
        UserSeeder userSeeder,
        CourseSeeder courseSeeder,
        ApplicationDbContext context,
        UserManager<ApplicationUser> userManager)
    {
        this.userSeeder = userSeeder;
        this.courseSeeder = courseSeeder;
        this.context = context;
        this.userManager = userManager;
    }

    public async Task SeedAsync(CancellationToken cancellationToken)
    {
        await userSeeder.SeedAsync(cancellationToken);
        await courseSeeder.SeedAsync(cancellationToken);

        await AssignStudentsToCourse(cancellationToken);
    }

    private async Task AssignStudentsToCourse(CancellationToken cancellationToken)
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