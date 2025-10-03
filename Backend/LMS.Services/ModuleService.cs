using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Entities;
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

    public async Task<IEnumerable<CourseModuleDto>> GetAllModulesFromCourseAsync(Guid courseId)
    {
        var modules = await uow.Modules.GetModulesAsync(courseId);
        return mapper.Map<IEnumerable<CourseModuleDto>>(modules);
    }

    public async Task<CourseModuleDto> CreateModuleAsync(Guid courseId, CreateModuleDto dto)
    {
        var exists = await uow.Modules.ExistsByNameAsync(courseId, dto.Name);
        if (exists)
            throw new ConflictException($"A module with the name '{dto.Name}' already exists on this course.");

        if (dto.EndDate < dto.StartDate)
        {
            throw new BadRequestException("End date cannot be earlier than start date");
        }

        var module = mapper.Map<CourseModule>(dto);

        uow.Modules.Create(module);
        await uow.CompleteAsync();

        return mapper.Map<CourseModuleDto>(module);

    }
}
