using LMS.Shared.Common;
using LMS.Shared.DTOs.UserDtos;
using LMS.Shared.Parameters;
using Microsoft.AspNetCore.Identity;

namespace Service.Contracts;

public interface IUserService
{
    Task<PagedResult<UserDto>> GetAllUsersAsync(UserQueryParameters userParams);
    Task<IdentityResult> UpdateUserAsync(string id, UserUpdateDto updateDto);
    Task<IdentityResult> DeleteUserAsync(string id);
}
