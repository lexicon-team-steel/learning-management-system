using Domain.Models.Entities;
using LMS.Shared.Parameters;

namespace Domain.Contracts.Repositories;

public interface IUserRepository : IRepositoryBase<ApplicationUser>
{
    public Task<ApplicationUser?> GetUserAsync(string id);
    public Task<List<ApplicationUser>> GetAllUsersAsync(UserQueryParameters userParams);
}
