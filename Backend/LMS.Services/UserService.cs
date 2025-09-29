using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Exceptions;
using LMS.Shared.DTOs.CourseModuleDtos;
using LMS.Shared.DTOs.UserDtos;
using Service.Contracts;

namespace LMS.Services;

public class UserService(IMapper mapper, IUnitOfWork uow, ICurrentUserService currentUser) : IUserService
{
    public Task<IEnumerable<UserDto>> GetAllUsers(UserQueryParameters userParams)
    {
        throw new NotImplementedException();
    }
}
