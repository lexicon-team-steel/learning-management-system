using System.Runtime.InteropServices;
using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using Domain.Models.Exceptions;
using LMS.Shared.DTOs.ActivityDtos;
using Service.Contracts;

namespace LMS.Services;

public class ActivityTypeService(IMapper mapper, IUnitOfWork uow) : IActivityTypeService
{
    public async Task<IEnumerable<ActivityTypeDto>> GetActivityTypesAsync()
    {
        var activityTypes = await uow.ActivityTypes.GetActivityTypesAsync();
        return mapper.Map<IEnumerable<ActivityTypeDto>>(activityTypes);
    }
}
