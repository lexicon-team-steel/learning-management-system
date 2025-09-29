using AutoMapper;
using Domain.Contracts.Repositories;
using LMS.Shared.DTOs.CourseModuleDtos;
using Service.Contracts;

namespace LMS.Services;

public class ModuleService(IMapper mapper, IUnitOfWork uow, ICurrentUserService currentUser) : IModuleService
{
    public Task<CourseModuleDto> GetUserModuleAsync(Guid moduleId)
    {
        throw new NotImplementedException();
    }
}