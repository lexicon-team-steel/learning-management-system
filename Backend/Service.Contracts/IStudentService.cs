using LMS.Shared.DTOs.CourseDtos;

namespace Service.Contracts;

public interface IStudentService
{
    public Task<CourseDto> GetCourseAsync(string userId);
}
