using Bogus;
using LMS.Infractructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Services.Seed;

public class CourseSeeder(ApplicationDbContext context)
{
    private readonly ApplicationDbContext context = context;

    public async Task SeedAsync(CancellationToken cancellationToken, int count = 10)
    {
        if (await context.Courses.AnyAsync(cancellationToken)) return;

        var courses = GenerateCourses(count);
        var modules = GenerateModules(courses, count * 5);

        await context.Courses.AddRangeAsync(courses);
        await context.CourseModules.AddRangeAsync(modules);
        await context.SaveChangesAsync();
    }

    private static List<Course> GenerateCourses(int count) =>
        new Faker<Course>()
            .RuleFor(c => c.Name, f => f.Company.CatchPhrase())
            .RuleFor(c => c.Description, f => f.Lorem.Paragraphs(2))
            .RuleFor(c => c.StartDate, f => f.Date.Recent())
            .RuleFor(c => c.EndDate, f => f.Date.FutureOffset(1).DateTime)
            .Generate(count);

    private static List<CourseModule> GenerateModules(List<Course> courses, int count) =>
        new Faker<CourseModule>()
            .RuleFor(c => c.Course, f => f.PickRandom(courses))
            .RuleFor(c => c.Name, f => f.Company.CompanyName())
            .RuleFor(c => c.Description, f => f.Lorem.Paragraphs(2))
            .RuleFor(c => c.StartDate, f => f.Date.Recent())
            .RuleFor(c => c.EndDate, f => f.Date.FutureOffset(1).DateTime)
            .Generate(count);
}
