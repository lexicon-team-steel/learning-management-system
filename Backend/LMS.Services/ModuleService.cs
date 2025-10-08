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
        var module = await uow.Modules.GetUserModuleAsync(userId, moduleId);

        if (module == null) throw new NotFoundException("Module not found or you don't have access");

        return mapper.Map<CourseModuleDto>(module);
    }

    public async Task<CourseModuleDto> GetModuleWithActivitiesAsync(Guid moduleId)
    {
        var module = await uow.Modules.GetModuleWithActivitiesAsync(moduleId);

        if (module == null) throw new NotFoundException("Module not found or you don't have access");

        return mapper.Map<CourseModuleDto>(module);
    }

    public async Task<CourseModuleDto> CreateModuleAsync(Guid courseId, CreateModuleDto dto)
    {
        await ValidateModuleAsync(courseId, dto.Name, dto.StartDate, dto.EndDate);

        var module = mapper.Map<CourseModule>(dto);
        module.CourseId = courseId;

        uow.Modules.Create(module);
        await uow.CompleteAsync();

        return mapper.Map<CourseModuleDto>(module);

    }

    public async Task<CourseModuleDto> UpdateAsync(Guid courseId, Guid moduleId, UpdateModuleDto dto)
    {
        var module = await uow.Modules.GetModuleAsync(moduleId);
        if (module == null)
            throw new NotFoundException("Module not found");

        await ValidateModuleAsync(courseId, dto.Name, dto.StartDate, dto.EndDate, moduleId);

        mapper.Map(dto, module);

        uow.Modules.Update(module);
        await uow.CompleteAsync();

        return mapper.Map<CourseModuleDto>(module);
    }

    public async Task DeleteAsync(Guid courseId, Guid moduleId)
    {
        var module = await uow.Modules.GetModuleAsync(moduleId);
        if (module == null)
            throw new NotFoundException("Module not found");

        uow.Modules.Delete(module);
        await uow.CompleteAsync();
    }

    private async Task ValidateModuleAsync(Guid courseId, string name, DateTime startDate, DateTime endDate, Guid? existingModuleId = null)
    {
        if (endDate < startDate)
            throw new BadRequestException("End date cannot be earlier than start date");

        var exists = await uow.Modules.ExistsByNameAsync(courseId, name, existingModuleId);
        if (exists)
            throw new ConflictException($"A module with the name '{name}' already exists.");

        var course = await uow.Courses.GetCourseWithModulesAsync(courseId);
        if (course == null)
            throw new NotFoundException("Course not found");

        var overlapping = course.Modules.Any(m => startDate < m.EndDate && endDate > m.StartDate);

        if (existingModuleId.HasValue)
            overlapping = course.Modules.Where(m => m.Id != existingModuleId.Value).Any(m => startDate < m.EndDate && endDate > m.StartDate);

        if (overlapping)
            throw new ConflictException("Module dates overlap with an existing module in this course");

        if (startDate < course.StartDate || startDate > course.EndDate || endDate < course.StartDate || endDate > course.EndDate)
            throw new BadRequestException("Module dates must be set within course dates.");
    }
}
