using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.StudentDtos;

namespace Service.Contracts;

public interface ICourseService
{
    public Task<IEnumerable<CourseDto>> GetUserCoursesAsync();
}
