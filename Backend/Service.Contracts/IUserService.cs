using LMS.Shared.DTOs.UserDtos;

namespace Service.Contracts;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllUsers(UserQueryParameters userParams);
}