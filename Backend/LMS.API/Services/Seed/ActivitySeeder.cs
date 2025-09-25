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

        var faker = new Faker();

        var activities = new List<Activity>();

        foreach (var module in modules)
        {
            var moduleStart = module.StartDate;
            var moduleEnd = module.EndDate;

            var currentStart = moduleStart;

            for (int i = 0; i < countPerModule; i++)
            {
                var duration = TimeSpan.FromHours(faker.Random.Int(1, 3));
                var activityEnd = currentStart + duration;

                if (activityEnd > moduleEnd)
                    break;

                var activity = new Activity
                {
                    Name = faker.Commerce.ProductName(),
                    Description = faker.Lorem.Sentence(),
                    StartDate = currentStart,
                    EndDate = activityEnd,
                    CourseModuleId = module.Id,
                    ActivityType = faker.PickRandom(types)
                };

                activities.Add(activity);

                currentStart = activityEnd.AddHours(faker.Random.Int(0, 2));

                if (currentStart >= moduleEnd)
                    break;
            }
        }

        await context.Activities.AddRangeAsync(activities, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }
}
