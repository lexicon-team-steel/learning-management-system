using Bogus;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Services.Seed;

public class CourseSeeder(ApplicationDbContext context)
{
    private readonly ApplicationDbContext context = context;

    public async Task SeedAsync(CancellationToken cancellationToken, int count = 5)
    {
        if (await context.Courses.AnyAsync(cancellationToken)) return;

        var courses = GenerateCourses(count);
        var modules = GenerateNonOverlappingModules(courses);

        await context.Courses.AddRangeAsync(courses, cancellationToken);
        await context.CourseModules.AddRangeAsync(modules, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    private static List<Course> GenerateCourses(int count) =>
        new Faker<Course>("sv")
            .RuleFor(c => c.Name, f => f.Company.CatchPhrase())
            .RuleFor(c => c.Description, f => f.Lorem.Paragraphs(2))
            .RuleFor(c => c.StartDate, f => f.Date.Recent())
            .RuleFor(c => c.EndDate, (f, c) => c.StartDate.AddDays(f.Random.Int(60, 120)))
            .Generate(count);

    private static List<CourseModule> GenerateNonOverlappingModules(List<Course> courses)
    {
        var faker = new Faker("sv");
        var modules = new List<CourseModule>();

        foreach (var course in courses)
        {
            var numberOfModules = faker.Random.Int(2, 4);
            var totalDays = (course.EndDate - course.StartDate).TotalDays;
            var avgModuleLength = totalDays / numberOfModules;

            var currentStart = course.StartDate;

            for (int i = 0; i < numberOfModules; i++)
            {
                var moduleLength = faker.Random.Double(avgModuleLength * 0.6, avgModuleLength * 1.4);
                var endDate = currentStart.AddDays(moduleLength);

                if (endDate > course.EndDate)
                    endDate = course.EndDate;

                var module = new CourseModule
                {
                    Course = course,
                    Name = faker.Company.CompanyName(),
                    Description = faker.Lorem.Paragraph(2),
                    StartDate = currentStart,
                    EndDate = endDate
                };

                modules.Add(module);

                currentStart = endDate.AddDays(faker.Random.Int(1, 3));

                if (currentStart >= course.EndDate)
                    break;
            }
        }

        return modules;
    }
}