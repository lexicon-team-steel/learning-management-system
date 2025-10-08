using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infrastructure.Data;
using LMS.Infrastructure.Extensions;
using LMS.Shared.Common;
using LMS.Shared.Parameters;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class UserRepository(ApplicationDbContext context) : RepositoryBase<ApplicationUser>(context), IUserRepository
{
    public async Task<PagedResult<ApplicationUser>> GetAllUsersAsync(UserQueryParameters userParams)
    {
        var users = FindAll();

        if (!string.IsNullOrWhiteSpace(userParams.Name))
        {
            var name = $"%{userParams.Name}%";
            users = users.Where(u =>
                EF.Functions.Like(u.LastName, name) ||
                EF.Functions.Like(u.FirstName, name) ||
                EF.Functions.Like((u.FirstName + " " + u.LastName).Trim(), name));
        }
        if (!string.IsNullOrWhiteSpace(userParams.Role))
            users = users.Where(u => u.UserRoles.Any(ur => EF.Functions.Like(ur.Role.Name, userParams.Role)));

        if (userParams.CourseId.HasValue)
            users = users.Where(u => u.Courses.Any(c => c.Id == userParams.CourseId));

        if (userParams.NotCourseId.HasValue)
            users = users.Where(u => !u.Courses.Any(c => c.Id == userParams.NotCourseId));

        if (userParams.AvailableForCourse.HasValue)
            users = users.Where(u =>
                (u.UserRoles.Any(r => r.Role.Name == "Teacher") && !u.Courses.Any(c => c.Id == userParams.AvailableForCourse)) ||
                (u.UserRoles.Any(r => r.Role.Name == "Student") && !u.Courses.Any())
            );

        users = users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role);
        return await users.ToPagedResultAsync(userParams.PageSize, userParams.PageIndex);
    }

    public Task<ApplicationUser?> GetUserAsync(string id) =>
        FindByCondition(s => s.Id == id).FirstOrDefaultAsync();
}
