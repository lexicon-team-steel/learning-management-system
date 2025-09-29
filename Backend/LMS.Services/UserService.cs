using AutoMapper;
using Domain.Contracts.Repositories;
using LMS.Shared.DTOs.UserDtos;
using Service.Contracts;

namespace LMS.Services;

public class UserService(IMapper mapper, IUnitOfWork uow) : IUserService
{
    public async Task<IEnumerable<UserDto>> GetAllUsersAsync(UserQueryParameters userParams)
    {
        var users = await uow.Users.GetAllUsersAsync(userParams);

        return mapper.Map<IEnumerable<UserDto>>(users);
    }
}
