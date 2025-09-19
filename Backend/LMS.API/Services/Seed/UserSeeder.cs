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
        await AddUserToDb("Teacher", "teacher@test.com", TeacherRole);
        await AddUserToDb("Student", "student@test.com", StudentRole);
    }

    private async Task AddUsersAsync(int nrOfUsers)
    {
        var students = new Faker<ApplicationUser>("sv")
            .RuleFor(u => u.Email, f => f.Person.Email)
            .RuleFor(u => u.FullName, f => f.Person.FullName)
            .Generate(nrOfUsers);

        for (int i = 0; i < nrOfUsers; i++)
        {
            await AddUserToDb(students[i].FullName, students[i].Email!, StudentRole);
        }
    }

    private async Task AddUserToDb(string name, string email, string role)
    {
        var existing = await userManager.FindByEmailAsync(email);
        if (existing != null) return;

        var passWord = configuration["password"];
        ArgumentNullException.ThrowIfNull(passWord, nameof(passWord));

        var user = new ApplicationUser { UserName = email, Email = email, FullName = name };

        var result = await userManager.CreateAsync(user, passWord);
        if (!result.Succeeded) throw new Exception(string.Join("\n", result.Errors));

        var roleresult = await userManager.AddToRoleAsync(user, role);
        if (!roleresult.Succeeded) throw new Exception(string.Join("\n", roleresult.Errors));
    }
}
