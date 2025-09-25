using LMS.Shared.DTOs.CourseDtos;

namespace Service.Contracts;

public interface ICourseService
{
    public Task<IEnumerable<CourseDto>> GetUserCoursesAsync();
    public Task<CourseDto> GetCourseWithModulesAsync(Guid courseId);
}
