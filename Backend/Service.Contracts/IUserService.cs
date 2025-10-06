using LMS.Shared.DTOs.UserDtos;
using LMS.Shared.Parameters;
using Microsoft.AspNetCore.Identity;

namespace Service.Contracts;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllUsersAsync(UserQueryParameters userParams);
    Task<IdentityResult> UpdateUserAsync(string id, UserUpdateDto updateDto);
}
