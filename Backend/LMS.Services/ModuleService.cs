using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Exceptions;
using LMS.Shared.DTOs.CourseModuleDtos;
using Service.Contracts;

namespace LMS.Services;

public class ModuleService(IMapper mapper, IUnitOfWork uow, ICurrentUserService currentUser) : IModuleService
{
    public async Task<CourseModuleDto> GetUserModuleAsync(Guid moduleId)
    {
        var userId = currentUser.UserId ?? throw new UnauthorizedException();
        var module = await uow.Modules.GetModuleAsync(userId, moduleId);

        if (module == null) throw new NotFoundException("Module not found or you don't have access");

        return mapper.Map<CourseModuleDto>(module);
    }
}
