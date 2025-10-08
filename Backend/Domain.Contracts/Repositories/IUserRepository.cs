using Domain.Models.Entities;
using LMS.Shared.Common;
using LMS.Shared.Parameters;

namespace Domain.Contracts.Repositories;

public interface IUserRepository : IRepositoryBase<ApplicationUser>
{
    public Task<ApplicationUser?> GetUserAsync(string id);
    public Task<PagedResult<ApplicationUser>> GetAllUsersAsync(UserQueryParameters userParams);
}
