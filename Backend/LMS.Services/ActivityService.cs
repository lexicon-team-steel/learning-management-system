using System.Runtime.InteropServices;
using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using Domain.Models.Exceptions;
using LMS.Shared.DTOs.ActivityDtos;
using Service.Contracts;

namespace LMS.Services;

public class ActivityService(IMapper mapper, IUnitOfWork uow, ICurrentUserService currentUser) : IActivityService
{
    public async Task<IEnumerable<ActivityDto>> GetActivitiesByModuleIdAsync(Guid moduleId)
    {
        var userId = GetUserId();

        var module = await uow.Modules.GetUserModuleWithActivitiesAsync(userId, moduleId);
        if (module == null)
            throw new NotFoundException("Module not found or you don't have access");

        return mapper.Map<IEnumerable<ActivityDto>>(module.Activities);
    }

    public async Task<IEnumerable<ActivityDto>> GetUserActivitiesAsync()
    {
        var userId = GetUserId();
        var activities = await uow.Activities.GetUserActivitiesAsync(userId, CancellationToken.None);

        return mapper.Map<IEnumerable<ActivityDto>>(activities);
    }


    public async Task<ActivityDto> CreateActivityAsync(Guid moduleId, CreateActivityDto dto)
    {
        if (dto.EndDate <= dto.StartDate)
            throw new BadRequestException("End date must be after start date");

        if (!(currentUser.Role?.Contains("Teacher") ?? false))
            throw new ForbiddenException("Only teachers can create activities");

        var module = await uow.Modules.GetModuleWithActivitiesAsync(moduleId);
        if (module == null)
            throw new NotFoundException("Module not found");

        var overlapping = module.Activities.Any(a =>
            dto.StartDate < a.EndDate && dto.EndDate > a.StartDate);
        if (overlapping)
            throw new ConflictException("Activity dates overlap with an existing activity in this module");

        var activity = mapper.Map<Activity>(dto);
        activity.CourseModuleId = moduleId;

        uow.Activities.Create(activity);
        await uow.CompleteAsync();

        var created = await uow.Activities.GetActivityWithTypeAsync(activity.Id);

        return mapper.Map<ActivityDto>(created);
    }

    private string GetUserId() =>
        currentUser.UserId ?? throw new UnauthorizedException();
}
