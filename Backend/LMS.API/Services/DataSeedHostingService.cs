using LMS.API.Services.Seed;

namespace LMS.API.Services;

public class DataSeedHostingService : IHostedService
{
    private readonly IServiceProvider serviceProvider;
    private readonly ILogger<DataSeedHostingService> logger;

    public DataSeedHostingService(IServiceProvider serviceProvider, ILogger<DataSeedHostingService> logger)
    {
        this.serviceProvider = serviceProvider;
        this.logger = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = serviceProvider.CreateScope();

        var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
        if (!env.IsDevelopment()) return;

        try
        {
            var seeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
            await seeder.SeedAsync(cancellationToken);
            logger.LogInformation("Seed complete");
        }
        catch (Exception ex)
        {
            logger.LogError($"Data seed fail with error: {ex.Message}");
            throw;
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
