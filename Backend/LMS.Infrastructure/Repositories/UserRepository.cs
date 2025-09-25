using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class UserRepository(ApplicationDbContext context) : RepositoryBase<ApplicationUser>(context), IUserRepository
{
    public Task<ApplicationUser?> GetUserAsync(string id) =>
        FindByCondition(s => s.Id == id).FirstOrDefaultAsync();
}
