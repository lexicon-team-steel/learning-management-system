using LMS.Shared.DTOs.ActivityDtos;

namespace Service.Contracts
{
    public interface IActivityService
    {
        Task<IEnumerable<ActivityDto>> GetActivitiesByModuleIdAsync(Guid moduleId);
        Task<IEnumerable<ActivityDto>> GetUserActivitiesAsync();
        Task<ActivityDto> CreateActivityAsync(Guid moduleId, CreateActivityDto dto);
        Task<ActivityDto> UpdateActivityAsync(Guid activityId, UpdateActivityDto dto);
        Task DeleteActivityAsync(Guid activityId);
    }
}
