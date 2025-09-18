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

        var courses = GenerateCourse(count);

        await context.Courses.AddRangeAsync(courses);
        await context.SaveChangesAsync();
    }

    private static List<Course> GenerateCourse(int count) =>
        new Faker<Course>()
            .RuleFor(c => c.Name, f => f.Company.CatchPhrase())
            .RuleFor(c => c.Description, f => f.Lorem.Paragraphs(2))
            .RuleFor(c => c.StartDate, f => f.Date.Recent())
            .RuleFor(c => c.EndDate, f => f.Date.FutureOffset(1).DateTime)
            .Generate(count);

}
