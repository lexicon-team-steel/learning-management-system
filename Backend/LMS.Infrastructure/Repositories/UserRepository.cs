using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infrastructure.Data;
using LMS.Shared.Parameters;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class UserRepository(ApplicationDbContext context) : RepositoryBase<ApplicationUser>(context), IUserRepository
{
    public Task<List<ApplicationUser>> GetAllUsersAsync(UserQueryParameters userParams)
    {
        var users = FindAll();
        if (!string.IsNullOrWhiteSpace(userParams.Name))
        {
            var name = $"%{userParams.Name}%";
            users = users.Where(u => EF.Functions.Like(u.LastName, name)
                || EF.Functions.Like(u.FirstName, name)
                || EF.Functions.Like(u.FirstName + " " + u.LastName, name));
        }
        if (!string.IsNullOrWhiteSpace(userParams.Role))
            users = users.Where(u => u.UserRoles.Any(u => EF.Functions.Like(u.Role.Name, userParams.Role)));
        return users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).ToListAsync();
    }

    public Task<ApplicationUser?> GetUserAsync(string id) =>
        FindByCondition(s => s.Id == id).FirstOrDefaultAsync();
}
