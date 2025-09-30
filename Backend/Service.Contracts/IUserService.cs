using LMS.Shared.DTOs.UserDtos;
using LMS.Shared.Parameters;

namespace Service.Contracts;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllUsersAsync(UserQueryParameters userParams);
}
