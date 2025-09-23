using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.StudentDtos;

namespace Service.Contracts;

public interface IStudentService
{
    public Task<CourseDto> GetCourseAsync(string userId);
    public Task<CourseDto> GetCourseWithModulesAsync(string userId);
    public Task<IEnumerable<StudentDto>> GetClassmates(string userId);
}
