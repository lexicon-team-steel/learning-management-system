using LMS.Shared.DTOs.CourseModuleDtos;

namespace Service.Contracts;

public interface IModuleService
{
    public Task<CourseModuleDto> GetUserModuleAsync(Guid moduleId);
    public Task<IEnumerable<CourseModuleDto>> GetAllModulesFromCourseAsync(Guid courseId);
    public Task<CourseModuleDto> CreateModuleAsync(Guid courseId, CreateModuleDto dto);
}

