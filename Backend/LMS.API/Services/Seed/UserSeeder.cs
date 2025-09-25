using Bogus;
using LMS.Infrastructure.Data;
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

    public async Task SeedAsync(CancellationToken cancellationToken, int count = 20)
    {
        if (await context.Users.AnyAsync(cancellationToken)) return;

        await AddRolesAsync([TeacherRole, StudentRole]);
        await AddDemoUsersAsync();
        await AddUsersAsync(count);
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
        await AddUserToDb("Teacher", "Teacher", "teacher@test.com", TeacherRole);
        await AddUserToDb("Student", "Student", "student@test.com", StudentRole);
    }

    private async Task AddUsersAsync(int nrOfUsers)
    {
        var students = new Faker<ApplicationUser>("sv")
            .RuleFor(u => u.Email, f => f.Person.Email)
            .RuleFor(u => u.FirstName, f => f.Person.FirstName)
            .RuleFor(u => u.LastName, f => f.Person.LastName)
            .Generate(nrOfUsers);

        for (int i = 0; i < nrOfUsers; i++)
        {
            await AddUserToDb(students[i].FirstName, students[i].LastName, students[i].Email!, i % 5 == 0 ? TeacherRole : StudentRole);
        }
    }

    private async Task AddUserToDb(string firstName, string lastName, string email, string role)
    {
        var existing = await userManager.FindByEmailAsync(email);
        if (existing != null) return;

        var passWord = configuration["password"];
        ArgumentNullException.ThrowIfNull(passWord, nameof(passWord));

        var user = new ApplicationUser { UserName = email, Email = email, FirstName = firstName, LastName = lastName };

        var result = await userManager.CreateAsync(user, passWord);
        if (!result.Succeeded) throw new Exception(string.Join("\n", result.Errors));

        var roleresult = await userManager.AddToRoleAsync(user, role);
        if (!roleresult.Succeeded) throw new Exception(string.Join("\n", roleresult.Errors));
    }
}
