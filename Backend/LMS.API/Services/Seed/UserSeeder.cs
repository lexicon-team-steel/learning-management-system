using Bogus;
using LMS.Infractructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Services.Seed;

public class UserSeeder(
    UserManager<ApplicationUser> userManager,
    RoleManager<IdentityRole> roleManager,
    IConfiguration configuration,
    ApplicationDbContext context)
{
    private readonly UserManager<ApplicationUser> userManager = userManager;
    private readonly RoleManager<IdentityRole> roleManager = roleManager;
    private readonly IConfiguration configuration = configuration;
    private readonly ApplicationDbContext context = context;

    public const string TeacherRole = "Teacher";
    public const string StudentRole = "Student";

    public async Task SeedAsync(CancellationToken cancellationToken)
    {
        if (await context.Users.AnyAsync(cancellationToken)) return;

        await AddRolesAsync([TeacherRole, StudentRole]);
        await AddDemoUsersAsync();
        await AddUsersAsync(20);
    }

    private async Task AddRolesAsync(string[] rolenames)
    {
        foreach (string rolename in rolenames)
        {
            if (await roleManager.RoleExistsAsync(rolename)) continue;

            var role = new IdentityRole { Name = rolename };
            var res = await roleManager.CreateAsync(role);

            if (!res.Succeeded) throw new Exception(string.Join("\n", res.Errors));
        }
    }

    private async Task AddDemoUsersAsync()
    {
        await AddUserToDb("teacher@test.com", TeacherRole);
        await AddUserToDb("student@test.com", StudentRole);
    }

    private async Task AddUsersAsync(int nrOfUsers)
    {
        var faker = new Faker("sv");
        for (int i = 0; i < nrOfUsers; i++)
        {
            var email = faker.Internet.Email();
            await AddUserToDb(email, StudentRole);
        }
    }

    private async Task AddUserToDb(string email, string role)
    {
        var existing = await userManager.FindByEmailAsync(email);
        if (existing != null) return;

        var passWord = configuration["password"];
        ArgumentNullException.ThrowIfNull(passWord, nameof(passWord));

        var user = new ApplicationUser { UserName = email, Email = email };

        var result = await userManager.CreateAsync(user, passWord);
        if (!result.Succeeded) throw new Exception(string.Join("\n", result.Errors));

        var roleresult = await userManager.AddToRoleAsync(user, role);
        if (!roleresult.Succeeded) throw new Exception(string.Join("\n", roleresult.Errors));
    }
}
