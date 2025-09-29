using AutoMapper;
using Domain.Contracts.Repositories;
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
            throw new NotFoundException("Module not found or you don’t have access");

        return mapper.Map<IEnumerable<ActivityDto>>(module.Activities);
    }

    private string GetUserId() =>
        currentUser.UserId ?? throw new UnauthorizedException();
}
