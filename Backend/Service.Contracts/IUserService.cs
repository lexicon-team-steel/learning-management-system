using LMS.Shared.DTOs.UserDtos;

namespace Service.Contracts;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllUsersAsync(UserQueryParameters userParams);
}