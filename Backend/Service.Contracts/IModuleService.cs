using LMS.Shared.DTOs.CourseModuleDtos;

namespace Service.Contracts;

public interface IModuleService
{
    public Task<CourseModuleDto> GetUserModuleAsync(Guid moduleId);
    public Task<CourseModuleDto> GetModuleWithActivitiesAsync(Guid moduleId);
    public Task<CourseModuleDto> CreateModuleAsync(Guid courseId, CreateModuleDto dto);
    public Task<CourseModuleDto> UpdateAsync(Guid courseId, Guid moduleId, UpdateModuleDto dto);
}

