using LMS.Shared.DTOs.ActivityDtos;

namespace Service.Contracts
{
    public interface IActivityService
    {
        Task<IEnumerable<ActivityDto>> GetActivitiesByModuleIdAsync(Guid moduleId);
    }
}
