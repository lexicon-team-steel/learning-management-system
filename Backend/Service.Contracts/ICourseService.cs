using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.UserDtos;

namespace Service.Contracts;

public interface ICourseService
{
    public Task<IEnumerable<CourseDto>> GetAllCoursesAsync();
    public Task<IEnumerable<CourseDto>> GetUserCoursesAsync();
    public Task<CourseDto> GetUserCourseWithModulesAsync(Guid courseId);
    public Task<CourseDto> GetCourseWithModulesAsync(Guid courseId);
    public Task<IEnumerable<UserDto>> GetCourseParticipantsAsync(Guid courseId, string? role);
    public Task<CourseDto> CreateAsync(CreateCourseDto dto);
    public Task<CourseDto> UpdateAsync(Guid courseId, UpdateCourseDto dto);
    public Task DeleteAsync(Guid courseId);
}
