using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infractructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infractructure.Repositories;

public class UserRepository(ApplicationDbContext context) : RepositoryBase<ApplicationUser>(context), IUserRepository
{
    public Task<ApplicationUser?> GetUserAsync(string id) =>
        FindByCondition(s => s.Id == id).FirstOrDefaultAsync();
}
