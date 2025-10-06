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

    public async Task<CourseModuleDto> CreateModuleAsync(Guid courseId, CreateModuleDto dto)
    {
        var exists = await uow.Modules.ExistsByNameAsync(courseId, dto.Name);
        if (exists)
            throw new ConflictException($"A module with the name '{dto.Name}' already exists on this course.");

        if (dto.EndDate < dto.StartDate)
        {
            throw new BadRequestException("End date cannot be earlier than start date");
        }

        var course = await uow.Courses.GetCourseWithModulesAsync(courseId);
        if (course == null)
            throw new NotFoundException("Course not found");

        var overlapping = course.Modules.Any(m =>
            dto.StartDate < m.EndDate && dto.EndDate > m.StartDate);
        if (overlapping)
            throw new ConflictException("Module dates overlap with an existing module in this course");

        var module = mapper.Map<CourseModule>(dto);
        module.CourseId = courseId;

        uow.Modules.Create(module);
        await uow.CompleteAsync();

        return mapper.Map<CourseModuleDto>(module);

    }
}
