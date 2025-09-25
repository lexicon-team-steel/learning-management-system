using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Services.Seed;

public class ActivityTypeSeeder(ApplicationDbContext context)
{
    private readonly ApplicationDbContext context = context;

    public async Task SeedAsync(CancellationToken cancellationToken)
    {
        if (await context.ActivityTypes.AnyAsync(cancellationToken)) return;

        var types = new[]
        {
            new ActivityType { Name = "Lecture" },
            new ActivityType { Name = "Workshop" },
            new ActivityType { Name = "Assignment" },
            new ActivityType { Name = "Exam" }
        };

        await context.ActivityTypes.AddRangeAsync(types, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }
}
