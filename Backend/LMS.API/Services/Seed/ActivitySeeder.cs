using Bogus;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Services.Seed;

public class ActivitySeeder(ApplicationDbContext context)
{
    private readonly ApplicationDbContext context = context;

    public async Task SeedAsync(CancellationToken cancellationToken, int countPerModule = 5)
    {
        if (!await context.CourseModules.AnyAsync(cancellationToken)) return;
        if (!await context.ActivityTypes.AnyAsync(cancellationToken)) return;
        if (await context.Activities.AnyAsync(cancellationToken)) return;

        var modules = await context.CourseModules.ToListAsync(cancellationToken);
        var types = await context.ActivityTypes.ToListAsync(cancellationToken);
        var faker = new Faker("sv");

        var activities = new List<Activity>();

        foreach (var module in modules)
        {
            var moduleStartDate = module.StartDate.Date;
            var moduleEndDate = module.EndDate.Date;

            var currentDate = moduleStartDate;

            while (currentDate <= moduleEndDate)
            {
                var activitiesToday = faker.Random.Int(0, 1);
                var currentTime = new DateTime(currentDate.Year, currentDate.Month, currentDate.Day, 8, 0, 0);

                for (int i = 0; i < activitiesToday; i++)
                {
                    var duration = TimeSpan.FromHours(faker.Random.Int(1, 3));
                    var endTime = currentTime.Add(duration);

                    if (endTime.Hour >= 17)
                        break;

                    var activity = new Activity
                    {
                        Name = faker.Commerce.ProductName(),
                        Description = faker.Lorem.Sentence(),
                        StartDate = currentTime,
                        EndDate = endTime,
                        CourseModuleId = module.Id,
                        ActivityType = faker.PickRandom(types)
                    };

                    activities.Add(activity);

                    // Nästa aktivitet börjar efter 15–60 minuters paus
                    currentTime = endTime.AddMinutes(faker.Random.Int(15, 60));

                    if (currentTime.Hour >= 17)
                        break;
                }

                currentDate = currentDate.AddDays(1);
            }
        }

        await context.Activities.AddRangeAsync(activities, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }
}