using LMS.Shared.DTOs.ActivityDtos;

namespace Service.Contracts
{
    public interface IActivityTypeService
    {
        Task<IEnumerable<ActivityTypeDto>> GetActivityTypesAsync();
    }
}
