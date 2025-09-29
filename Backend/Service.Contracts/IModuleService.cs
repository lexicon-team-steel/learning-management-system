using LMS.Shared.DTOs.CourseModuleDtos;

namespace Service.Contracts;

public interface IModuleService
{
    public Task<CourseModuleDto> GetUserModuleAsync(Guid moduleId);
}