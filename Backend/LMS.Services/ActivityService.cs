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
        var module = await uow.Modules.GetModuleWithActivitiesAsync(moduleId)
            ?? throw new NotFoundException("Module not found");

        ValidateActivityDates(dto.StartDate, dto.EndDate, module);

        ValidateNoOverlap(module.Activities, dto.StartDate, dto.EndDate);

        var activity = mapper.Map<Activity>(dto);
        activity.CourseModuleId = moduleId;

        uow.Activities.Create(activity);
        await uow.CompleteAsync();

        var created = await uow.Activities.GetActivityWithTypeAsync(activity.Id);
        return mapper.Map<ActivityDto>(created);
    }

    public async Task<ActivityDto> UpdateActivityAsync(Guid activityId, UpdateActivityDto dto)
    {
        var activity = await uow.Activities.GetActivityWithTypeAsync(activityId)
            ?? throw new NotFoundException("Activity not found");

        var module = await uow.Modules.GetModuleWithActivitiesAsync(activity.CourseModuleId)
            ?? throw new NotFoundException("Parent module not found");

        ValidateActivityDates(dto.StartDate, dto.EndDate, module);

        ValidateNoOverlap(module.Activities, dto.StartDate, dto.EndDate, activity.Id);

        mapper.Map(dto, activity);

        uow.Activities.Update(activity);
        await uow.CompleteAsync();

        var updated = await uow.Activities.GetActivityWithTypeAsync(activity.Id);
        return mapper.Map<ActivityDto>(updated);
    }

    public async Task DeleteActivityAsync(Guid activityId)
    {
        var activity = await uow.Activities.GetActivityWithTypeAsync(activityId)
            ?? throw new NotFoundException("Activity not found");

        uow.Activities.Delete(activity);
        await uow.CompleteAsync();
    }

    private static void ValidateActivityDates(DateTime startDate, DateTime endDate, CourseModule parentModule)
    {
        if (endDate <= startDate)
            throw new BadRequestException("End date must be after start date");

        if (startDate < parentModule.StartDate || endDate > parentModule.EndDate)
            throw new BadRequestException("Activity dates must be set within module dates.");
    }

    private static void ValidateNoOverlap(IEnumerable<Activity> existingActivities, DateTime startDate, DateTime endDate, Guid? currentActivityId = null)
    {
        var overlapping = existingActivities.Any(a =>
            (!currentActivityId.HasValue || a.Id != currentActivityId.Value) &&
            startDate < a.EndDate && endDate > a.StartDate);

        if (overlapping)
            throw new ConflictException("Activity dates overlap with an existing activity in this module");
    }

    private string GetUserId() =>
        currentUser.UserId ?? throw new UnauthorizedException();
}
